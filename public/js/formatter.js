// Mask / Formatter

$(function () {
  'use strict';
	
	//Date dd/mm/yyyy
	$('#date').formatter({
	  'pattern': '{{99}}/{{99}}/{{9999}}',
	  'persistent': true
	});
	
	//Date 2 yyyy-mm-dd
	$('#date2').formatter({
	  'pattern': '{{9999}}-{{99}}-{{99}}',
	  'persistent': true
	});
	
	//Time hh:mm
	$('#time').formatter({
	  'pattern': '{{99}}:{{99}}',
	  'persistent': true
	});

	//Open time hh:mm
	$('#opentime').formatter({
		'pattern': '{{99}}:{{99}}',
		'persistent': true
	  });

	//Closed time hh:mm
	$('#closedtime').formatter({
		'pattern': '{{99}}:{{99}}',
		'persistent': true
	  });

	//Open time hh:mm
	$('#opentime2').formatter({
		'pattern': '{{99}}:{{99}}',
		'persistent': true
	  });

	//Closed time hh:mm
	$('#closedtime2').formatter({
		'pattern': '{{99}}:{{99}}',
		'persistent': true
	  });
	
	//Date time dd/mm/yyyy hh:mm
	$('#date-time').formatter({
	  'pattern': '{{99}}/{{99}}/{{9999}} {{99}}:{{99}}',
	  'persistent': true
	});
	
	//Phone E.g. (123) 456-7890
	$('#phone').formatter({
	  'pattern': '({{999}}) {{999}}-{{9999}}',
	  'persistent': true
	});

	//Mobile E.g. (123) 456-7890
	$('#mobile').formatter({
		'pattern': '({{999}}) {{999}}-{{9999}}',
		'persistent': true
	  });

	//Phone E.g. (123) 456-7890
	$('#phone3').formatter({
		'pattern': '({{999}}) {{999}}-{{9999}}',
		'persistent': true
	  });
  
	  //Mobile E.g. (123) 456-7890
	  $('#mobile3').formatter({
		  'pattern': '({{999}}) {{999}}-{{9999}}',
		  'persistent': true
		});

	//Phone E.g. (123) 456-7890
	$('#phone4').formatter({
		'pattern': '({{999}}) {{999}}-{{9999}}',
		'persistent': true
	  });
  
	//Mobile E.g. (123) 456-7890
	  $('#mobile4').formatter({
		  'pattern': '({{999}}) {{999}}-{{9999}}',
		  'persistent': true
		});

	//Phone E.g. (123) 456-7890
	$('#phone5').formatter({
		'pattern': '({{999}}) {{999}}-{{9999}}',
		'persistent': true
	  });
  
	//Mobile E.g. (123) 456-7890
	  $('#mobile5').formatter({
		  'pattern': '({{999}}) {{999}}-{{9999}}',
		  'persistent': true
		});
	
	//Phone 2 E.g. +1 123-456-7890
	$('#phone2').formatter({
	  'pattern': '+1 {{999}}-{{999}}-{{999}}',
	  'persistent': true
	});
	
	//Percent E.g. %25.36
	$('#percent').formatter({
	  'pattern': '%{{99}}.{{99}}',
	  'persistent': true
	});
	
	//Username 8 character
	$('#username').formatter({
	  'pattern': '{{aaaaaaaa}}',
	  'persistent': true
	});
	
	//Price E.g. $ 999.99
	$('#price').formatter({
	  'pattern': '$ {{999}}.{{99}}',
	  'persistent': true
	});
	
	//Credit card
	$('#creditcard').formatter({
	  'pattern': '{{9999}}-{{9999}}-{{9999}}-{{9999}}',
	  'persistent': true
	});
	
	//SSN E.g. 123-45-6789
	$('#ssn').formatter({
	  'pattern': '{{999}}-{{99}}-{{9999}}',
	  'persistent': true
	});
	
	//Product key E.g. PN 123 4567
	$('#productkey').formatter({
	  'pattern': 'P{{a}} {{999}} {{9999}}',
	  'persistent': true
	});

	//nationid E.g. 1-2345-678-9123-1
	$('#nationid').formatter({
		'pattern': '{{9}}-{{9999}}-{{999}}-{{9999}}-{{9}}',
		'persistent': true
	  });

	//Legalid E.g. 1-2345-678-9123-1
	$('#legalid').formatter({
		'pattern': '{{9}}-{{9999}}-{{999}}-{{9999}}-{{9}}',
		'persistent': true
	  });

	//Legalid E.g. 1-2345-678-9123-1
	$('#legalid2').formatter({
		'pattern': '{{9}}-{{9999}}-{{999}}-{{9999}}-{{9}}',
		'persistent': true
	  });
	
	//ZIP E.g. 10330
	$('#zip').formatter({
		'pattern': '{{99999}}',
		'persistent': true
	  });

	//ZIP E.g. 10330
	$('#zip2').formatter({
		'pattern': '{{99999}}',
		'persistent': true
	  });
	
	//bankid E.g. 1-2345-678-9123-1
	$('#bankid').formatter({
		'pattern': '{{999}}-{{999999}}-{{9}}',
		'persistent': true
	  });
	
});// End of use strict