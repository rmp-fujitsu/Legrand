// id_proposed_media_name
// Listen var: my_item.type,my_item.category,my_item.product

var proposedMediaName = "";
if (id_my_item.id_class.getSelectedLabel() == "Tutoriel") {
    proposedMediaName = "Tutoriel: ";
}
var categoryValue = id_my_item.id_category.getSelectedLabel();
var productValue = id_my_item.id_product.getSelectedLabel();
var typeValue = id_my_item.id_type.getSelectedLabel();
if (!isEmpty(typeValue) && (id_my_item.id_type.getSelectedValue() != "__##prompt##__") ) {
    proposedMediaName += typeValue;
}
if (!isEmpty(categoryValue) && (id_my_item.id_category.getSelectedValue() != "__##prompt##__") ) {
    proposedMediaName += " - " + categoryValue;
}
if (!isEmpty(productValue) && (id_my_item.id_product.getSelectedValue() != "__##prompt##__") ) {
    proposedMediaName += " - " + productValue;
}
if (proposedMediaName != "") {
    RMPApplication.set("my_item.media_name", proposedMediaName);
}