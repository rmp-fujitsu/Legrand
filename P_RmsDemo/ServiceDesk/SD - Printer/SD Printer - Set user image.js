set_image();

function set_image() 
{
	var language = RMPApplication.get("language");
	var id_img_sdesk_1 = $("#id_img_sdesk_1");
	var id_img_sdesk_2 = $("#id_img_sdesk_2");
	var id_img_sdesk_3 = $("#id_img_sdesk_3");
	var paper_jam;
	var unknown_error;
	var printer_out_of_paper;
	var paper_jam_es = "https://live.runmyprocess.com/live/112501480325272109/upload/ebea52c0-77d2-11e8-b09e-02b3a23437c9/SD_PRN_bourrage_papier_ES.png";
	var paper_jam_fr = "https://live.runmyprocess.com/live/112501480325272109/upload/bd75b750-568f-11e7-8e20-02b3a23437c9/SD_PRN_bourrage_papier_FR.png";
	var paper_jam_en = "https://live.runmyprocess.com/live/112501480325272109/upload/e19620b0-77d2-11e8-8dc4-066d75fba2ef/SD_PRN_bourrage_papier_EN.png";
	var paper_jam_pt = "https://live.runmyprocess.com/live/112501480325272109/upload/e6a32850-77d2-11e8-b09e-02b3a23437c9/SD_PRN_bourrage_papier_PT.png";
	var paper_jam_it = "https://live.runmyprocess.com/live/112501480325272109/upload/2cd45d80-77d3-11e8-b09e-02b3a23437c9/SD_PRN_bourrage_papier_IT.png";
	var unknown_error_es = "https://live.runmyprocess.com/live/112501480325272109/upload/030abbc0-77d3-11e8-b6b5-0619bd984419/SD_PRN_erreur_inconnue_ES.png";
	var unknown_error_fr = "https://live.runmyprocess.com/live/112501480325272109/upload/bffe5e00-568f-11e7-82f0-066d75fba2ef/SD_PRN_erreur_inconnue_FR.png";
	var unknown_error_en = "https://live.runmyprocess.com/live/112501480325272109/upload/f0e9c5d0-77d2-11e8-8dc4-066d75fba2ef/SD_PRN_erreur_inconnue_EN.png";
	var unknown_error_pt = "https://live.runmyprocess.com/live/112501480325272109/upload/fdc20ab0-77d2-11e8-b6b5-0619bd984419/SD_PRN_erreur_inconnue_PT.png";
	var unknown_error_it = "https://live.runmyprocess.com/live/112501480325272109/upload/f78d24e0-77d2-11e8-b09e-02b3a23437c9/SD_PRN_erreur_inconnue_IT.png";
	var printer_out_of_paper_es = "https://live.runmyprocess.com/live/112501480325272109/upload/12868250-77d3-11e8-b09e-02b3a23437c9/SD_PRN_manque_papier_ES.png";
	var printer_out_of_paper_fr = "https://live.runmyprocess.com/live/112501480325272109/upload/c28cf820-568f-11e7-ba78-0639651b3341/SD_PRN_manque_papier_FR.png";
	var printer_out_of_paper_en = "https://live.runmyprocess.com/live/112501480325272109/upload/08046270-77d3-11e8-8dc4-066d75fba2ef/SD_PRN_manque_papier_EN.png";
	var printer_out_of_paper_pt = "https://live.runmyprocess.com/live/112501480325272109/upload/0decd5f0-77d3-11e8-8dc4-066d75fba2ef/SD_PRN_manque_papier_PT.png";
	var printer_out_of_paper_it = "https://live.runmyprocess.com/live/112501480325272109/upload/27383540-77d3-11e8-8dc4-066d75fba2ef/SD_PRN_manque_papier_IT.png";

	switch (language) {
		case "fr" : 
			paper_jam = '<img class="img-responsive" src="' + paper_jam_fr +'">';
			unknown_error = '<img class="img-responsive" src="' + unknown_error_fr + '">';
			printer_out_of_paper = '<img class="img-responsive" src="' + printer_out_of_paper_fr + '">';
			break;
		case "es" :
			paper_jam = '<img class="img-responsive" src="' + paper_jam_es + '">';
			unknown_error = '<img class="img-responsive" src="' + unknown_error_es + '">';
			printer_out_of_paper = '<img class="img-responsive" src="' + printer_out_of_paper_es + '">';
			break;
		case "pt" :
			paper_jam = '<img class="img-responsive" src="' + paper_jam_pt + '">';
			unknown_error = '<img class="img-responsive" src="' + unknown_error_pt + '">';
			printer_out_of_paper = '<img class="img-responsive" src="' + printer_out_of_paper_pt + '">';
			break;
		case "en" :
			paper_jam = '<img class="img-responsive" src="' + paper_jam_en + '">';
			unknown_error = '<img class="img-responsive" src="' + unknown_error_en + '">';
			printer_out_of_paper = '<img class="img-responsive" src="' + printer_out_of_paper_en + '">';
			break;
		case "it" :
			paper_jam = '<img class="img-responsive" src="' + paper_jam_it + '">';
			unknown_error = '<img class="img-responsive" src="' + unknown_error_it + '">';
			printer_out_of_paper = '<img class="img-responsive" src="' + printer_out_of_paper_it + '">';
			break;
		default : 
			paper_jam = '<img class="img-responsive" src="' + paper_jam_fr + '">';
			unknown_error = '<img class="img-responsive" src="' + unknown_error_fr + '">';
			printer_out_of_paper = '<img class="img-responsive" src="' + printer_out_of_paper_fr + '">';
			break;
	}
	
	id_img_sdesk_1.html('');
	id_img_sdesk_1.append(paper_jam);
	id_img_sdesk_2.html('');
	id_img_sdesk_2.append(printer_out_of_paper);
	id_img_sdesk_3.html('');
	id_img_sdesk_3.append(unknown_error);
}
