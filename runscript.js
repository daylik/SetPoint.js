$(document).ready(function() {

//global vars and functions!
//S.Device = SP.GetDevice();
//S.DeviceType = SP.GetDeviceType();
//S.Browser = SP.GetBrowser();
//S.Mratio = SP.Mratio(); monitor aspect Satio!
//S.PixelRatio = SP.PixelRatio();
//S.dpi = SP.dpi();

//SP.log('call'); 				//to console log for ie6+
//SP.SmartResize(functionName); //to Smart resize function!

//alert(S.device);
//alert(S.device_type);
//alert(S.browser);
//alert(S.Mratio);
//alert(SP.isIE());
//alert(SP.isIE(7)); // if ie7 return true!
//to start rush use SP.run();  //default param for Bootstrap setings!

SP.run({
		head: 'html',	// this tag or class or id to set a global CSS settings class
		body: 'body',	// S framework id on html page, this make some settings at class name if this have Class .fluid - all page be in fluid mode!
		
		resize_delay : 10,		//10ms
		respond_delay : 100,		//200ms
		smart_resize : false,		// this for ie6-7 automatik = 'true'!
		smart_resize_speed : 100, 	// 200ms resize delay
		
		w_step_on : true,
		w_step_class : 'w-min w-xs w-sm w-md w-lg w-hd',	//for bootstrap: w_step_class = 'w-xs w-xs w-sm w-md w-lg';  (count = min: 1, max: 99+)
		w_step_size : '240 478 768 992 1200 1980',		//for bootstrap: w_step_size = '478 768 992 1200 1980'; (count = min: 1, max: 99+)
		
		w_max_on : true,
		w_max_class : 'w-max478 w-max767 w-max992',	// 'w-max478 w-max767 w-max992'; (count = min: 0, max: 99+)
		w_max_size : '478 767 992',					// '478 767 992' = CSS: @media (max-width: 478), @media (max-width: 767) ...
		
		w_min_on : true,
		w_min_class : 'w-min768 w-min992',	// 'w-min768 w-min992'; (count =  min: 0, max: 99+)
		w_min_size : '768 992',				// '768 992' = CSS: @media (min-width: 768), @media (min-width: 992) ...
		
		h_step_on : true,				//if need to listen a browser height - $(window).height();
		h_step_class : 'h-min h-xs h-sm h-md h-max', //(count =  min: 0, max: 99+)
		h_step_size : '240 478 768 992 1200',
		
		S_Webmaster : true,		//Webmaster info view or hide true/false; WARNING this param is low speed respond function!
		S_start_view : true,	//Webmaster info view if page loaded or hide true/false;
		S_timers : true,		//Timer function on/off;
		
		//CSS Class Names: .land, .port ...
		landscape: 'land',
		portriet: 'port',
		blackberry: 'blackberry',
		iemobile: 'winphone',
		firefox: 'ffox',
		windows: 'windows',
		macos: 'macos',
		px_: '_',     			// '_' = css class: px1_2 = pixel ratio 1.2 don't use a dot!
		ratio_prefix : 'r' 		// css class prefix for default screen ratio: 'ratio-' + value = 'ratio-16x9', 'ratio-4x3';
});


/* 
function myFUNC(){
	SP.log('call myFUNC');
}

//SP API Smart Resize Function!
SP.SmartResize(myFUNC); 
*/

});
