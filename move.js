$(document).ready(function(){
    var numberOfDiscs;    
    var discHeight = 30;
    var minDiscWidth = 50;
    var busy = true;
    var queueTo = new Array();
    var queueFrom = new Array();
    var numberOfSteps;
    renderControls();

    


    function RunTowersOfHanoi(number, src, dst, tmp){
        if(number > 0)
        {
            RunTowersOfHanoi(number-1, src, tmp, dst);
            queueFrom.unshift(src);
            queueTo.unshift(dst);
            RunTowersOfHanoi(number-1, tmp, dst, src);
        }
    };
    
    function runQueue(queueTo, queueFrom){
        var to = queueTo;
        var from = queueFrom;
        var time = 333;
        var moves = $("#movesLeft").text() -1;
        $("#movesLeft").html(moves);
        if(to.length > 0)
        {
            var destination = to.pop();
            var source = from.pop();
            var distanceX = destination.dist - source.dist;
            var distanceUp = 410 - ((source.members.length -1) * discHeight);
            var distanceDown = 410 - ((destination.members.length) * discHeight);
            $(source.members[(source.members.length-1)]).animate( {"top": "-="+distanceUp}, time);
            $(source.members[(source.members.length-1)]).animate( {"left": "+="+distanceX}, time);
            $(source.members[(source.members.length-1)]).animate( {"top": "+="+distanceDown}, time, function(){
                destination.members.push(source.members.pop());
                if(queueTo.length > 0)
                    runQueue(to, from);
            });
        }           
    };
    
    function initialize(initSpindel){
        var startY = $("#container").offset().top + 670;
        for(var i = 0; i < numberOfDiscs; i++){
            var discWidth = 50 + (((300/numberOfDiscs) * (numberOfDiscs - i)));
            var startX = $("#container").offset().left + (initSpindel.dist - (discWidth/2));
            $(initSpindel.members[i]).offset({ top: (startY - (i * discHeight)), left: startX});
            $(initSpindel.members[i]).css("width", discWidth);
            
        }
        $("#discSelector").val(numberOfDiscs);
        
    };

    $("#goButton").click(function(){
        $(".disc").remove();
        if($("#discSelector").val() > 0){

            var A = new Object();
            A.dist = 200;
            A.members = new Array;
            
            var B = new Object();
            B.dist = 600;
            B.members = new Array;
            
            var C = new Object();
            C.dist = 1000;
            C.members = new Array;

            numberOfDiscs = $("#discSelector").val();
            numberOfSteps = Math.pow(2, numberOfDiscs);
            $("#movesLeft").html(numberOfSteps-1);
            for(var i = 0; i < numberOfDiscs; i++){
                jQuery('<div/>', {
                    id: 'disc'+i,
                    class: 'disc',
                }).appendTo('#container');
            }
            for(var i = 0; i < numberOfDiscs; i++){
                A.members.push("#disc"+i);
            };
            initialize(A);
            RunTowersOfHanoi(numberOfDiscs, A, C, B);
            runQueue(queueTo, queueFrom);
        }
    });

    function renderControls(){
        $("#discSelector").offset({
            top: $("#container").offset().top + 100,
            left: $("#container").offset().left + 573
        });
        $("#instruct").offset({
            top: $("#container").offset().top + 50,
            left: $("#container").offset().left + 450
        });
        $("#goButton").offset({
            top: $("#container").offset().top + 150,
            left: $("#container").offset().left + 575
        });
        $("#aboutMoves").offset({
            top: $("#container").offset().top + 200,
            left: $("#container").offset().left + 425
        });
        $("#movesLeft").offset({
            top: $("#container").offset().top + 200,
            left: $("#container").offset().left + 570
        });
    }
});