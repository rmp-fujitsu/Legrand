// Hide or show category & product_type fields
// according the "class" value
// Listen var: my_item.class

var classe = RMPApplication.get("my_item.class");

if (classe == "model") {
    id_my_item.id_sn_category.setActive(true);
    id_my_item.id_sn_u_product_type.setActive(true);
    c_debug(dbug.item, "=> classe = model");
} else {
    id_my_item.id_sn_category.setActive(false);
    id_my_item.id_sn_category.setVisible(false);
    id_my_item.id_sn_u_product_type.setActive(false);
    id_my_item.id_sn_u_product_type.setVisible(false);
    c_debug(dbug.item, "=> classe <> model");
}