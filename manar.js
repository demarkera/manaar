    function switcher(divId) {
        $("div#" + divId).toggle();
    }

    function switcherAux(divId, value) {
        //alert(value);
        $("#aux").toggle();
        $("#aux_value").show();
        $("#aux_legend").text(value);
        $("#aux_value").html($("div#" + divId).html());
        //$("div#" + divId).show();
    }

    $("span").click(function() {
        switcher(this.id);
    });
    $("mark").click(function() {
        switcherAux(this.id, $(this).text());
    });
