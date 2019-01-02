/**
I18n management
*/
var DEFAULT_SECTION_NAME = ${P_quoted(i18n('homepage-default-section-name', 'Applications'))};

/**
Configuration 
*/
// Exact tags list in the wanted order
var TAG_LIST = [${P_quoted(i18n('homepage-administration-section-name', 'Administration Applications'))}, ${P_quoted(i18n('homepage-support-section-name', 'Support'))}];
RMPApplication.debug('Tag list: '+JSON.stringify(TAG_LIST));

// Display on 'top', 'bottom' or 'none' the unlisted tag (top or bottom of the listed tags) 
var DISPLAY_POLICY = 'top';

/**
Below the two templates to defined the 
    #1 the content of one section (which is one tag)
    #2 the list of the applications for this section (for this tag)
*/
var SECTION_TEMPLATE = '<div class="expandable opened" align="left"><ul>#applications</ul></div>';
var APPLICATION_TEMPLATE = '<li><a href="/#url" target = "_blank"><span id = "a#id" class="bigIcon #appIconClass icon" #attr></span><span class="bigIcon rmphelp desc"><br/>#description</span><span class="label">#name</span></a><div onclick = "openBasket(#id)" class = "rmpappbasket b#id"></div><div class = "rmpdescription #descrClass"><span>i</span></div></li>';

/**
Extract hompage application id
*/
var homepageId = (new RegExp('.*\\/appli\\/([0-9]+).*')).exec(location.href)[1];
RMPApplication.debug('Homepage id: '+homepageId);

/**
Common method to replace all dynamic values of the templates
*/
function compile(src, context){
    if (context) for (var key in context) src = src.replace(new RegExp('#'+key, 'g'), context[key]);    
    return src;     
}

/**
Collect the list of the application for the connected user 
@See: http://docs.runmyprocess.com/API_Reference/FM/User.html
*/
var tags = ${get_applications(P_user.login,context,true)};

/**
We loop on the tags of the applications and build for each tag one section
*/
var sectionIndex = 0;
function tagsLoop(){
    jQuery.each(tags, function(tag, apps) {
        for (var index=0; index<TAG_LIST.length; index++) if (TAG_LIST[index] == tag) {
            RMPApplication.debug('Tag skiped: '+tag);
            return;
        }
        sectionManagement(tag, apps);

    });
}
function sectionManagement(tag, apps){
    var sectionName = tag == 'NO_TAG'?DEFAULT_SECTION_NAME:tag;     
    RMPApplication.debug('Tag management: '+tag);
    var html = '';
 		apps.sort(function(a, b){return a.title && b.title && a.title.toUpperCase()>b.title.toUpperCase()?1:-1;});
    for (var index = 0; index < apps.length; index++){
        var appId = apps[index].id;
        if (appId != homepageId){
            var styleAttr = '';
            if (apps[index].thumb && apps[index].thumb != ''){
                styleAttr = 'style="background: url(\''+apps[index].thumb+'\')"';
            }
            var context = { name:apps[index].title, 
                url:apps[index].url, 
                id:appId, 
                description:apps[index].description, 
                appIconClass: 'bigIcon-defaultApps0',
                descrClass:apps[index].description && apps[index].description.length>0?'':'hidden',
                attr:styleAttr
            };
            html += compile(APPLICATION_TEMPLATE, context);         
        }
    }   
if(html.length>0){
    var wSection = new RMP_Section({id:'section'+sectionIndex});
    wSection.setLabel(sectionName);
    wSection.open();
    script.insertAbove(wSection);
    jQuery('#section'+sectionIndex+' div').html(compile(SECTION_TEMPLATE, {applications: html}));
    sectionIndex++; 
}
}

if (DISPLAY_POLICY == 'bottom' || DISPLAY_POLICY == 'none'){
    RMPApplication.debug('Listed tag management at bottom');
    for (var index=0; index < TAG_LIST.length; index++) {
       if(tags[TAG_LIST[index]])
           sectionManagement(TAG_LIST[index], tags[TAG_LIST[index]]);

    }
}
if (DISPLAY_POLICY != 'none'){
    RMPApplication.debug('Unlisted tag management');
    tagsLoop();
}
if (DISPLAY_POLICY == 'top'){
    RMPApplication.debug('Listed tag management on top');
    for (var index=0; index < TAG_LIST.length; index++) {
       if(tags[TAG_LIST[index]])
           sectionManagement(TAG_LIST[index], tags[TAG_LIST[index]]);
    }
}

/**
Hide all application's descriptions
*/
jQuery('.rmphelp').hide();

/** 
Define the behavior when the user click on the "Information icon"
(based on the html structure above)
*/
jQuery('.rmpdescription').click(
    function () {
        if (jQuery(this).hasClass('displayed')) {
            jQuery(this).removeClass('displayed');
            jQuery(this.parentNode).find('.desc').hide()
            jQuery(this.parentNode).find('.icon').fadeIn('slow');
        }else{
            jQuery(this).addClass('displayed');
            jQuery(this.parentNode).find('.icon').hide()
            jQuery(this.parentNode).find('.desc').fadeIn('slow');
        }
    }
);

/**
Basket management. 
@See: http://docs.runmyprocess.com/Developer_Guide/Web_Interface/User_Experience/Basket
*/
function notify(data){
    for (var tag in tags){
        if (tags.hasOwnProperty(tag)){
            for (var appIndex = 0; appIndex < tags[tag].length; appIndex++){
                var id = tags[tag][appIndex].id;
                var b = jQuery('.b'+id);
                if (data.ASSIGNED_TO && data.ASSIGNED_TO[1] && data.ASSIGNED_TO[1][id]){
                    b.html(data.ASSIGNED_TO[1][id]);
                    b.addClass('rmpbactive');
                }else{
                    b.removeClass('rmpbactive');
                }
            }
        }
    }
}
function openBasket(id){
        RMP_basket.popup(id, 'ASSIGNED_TO', 1);
}

if (RMP_basket){
    RMP_basket.addListener(notify);
}