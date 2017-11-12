// Hide or show category & product_type fields
// according the "class" value

var classe = RMPApplication.get("my_item.class");

switch (classe) {
	case "category" :
		id_my_item.id_u_category.setActive(true);
		id_my_item.id_u_category.setVisible(true);
		id_my_item.id_u_product_type.setVisible(false);
		id_my_item.id_u_problem_type.setVisible(false);
		break;
	case "u_product_type" :
		id_my_item.id_u_category.setActive(true);
		id_my_item.id_u_category.setVisible(true);
		id_my_item.id_u_product_type.setActive(true);
		id_my_item.id_u_product_type.setVisible(true);
		id_my_item.id_u_problem_type.setVisible(false);
		break;
	case "u_problem_type" :
		id_my_item.id_u_category.setActive(true);
		id_my_item.id_u_category.setVisible(true);
		id_my_item.id_u_product_type.setActive(true);
		id_my_item.id_u_product_type.setVisible(true);
		id_my_item.id_u_problem_type.setActive(true);
		id_my_item.id_u_problem_type.setVisible(true);
		break;
}
