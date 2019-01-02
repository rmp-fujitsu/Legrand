// This function shows all required fields, which are not filled

RMPWidgets.forEachWidget(showType);

function showType(widget) 
{
    try 
    {
        if (!widget.isValid()) {
            alert(widget.getName());
        }
    } 
    
    catch(err) {}
}