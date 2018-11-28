<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.1" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" exclude-result-prefixes="fo">
    <xsl:output method="xml" version="1.0" omit-xml-declaration="no" indent="yes"/>
    <xsl:template match="my_var_main">
        <fo:root font-family="Arial" 
            xmlns:fo="http://www.w3.org/1999/XSL/Format" 
            xmlns:w="http://schemas.microsoft.com/office/word/2003/wordml">
            <fo:layout-master-set xmlns:rx="http://www.renderx.com/XSL/Extensions" 
                xmlns:o="urn:schemas-microsoft-com:office:office" 
                xmlns:v="urn:schemas-microsoft-com:vml" 
                xmlns:wx="http://schemas.microsoft.com/office/word/2003/auxHint" 
                xmlns:aml="http://schemas.microsoft.com/aml/2001/core" 
                xmlns:w10="urn:schemas-microsoft-com:office:word" 
                xmlns:dt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882">
                <fo:simple-page-master master-name="section1-first-page" page-width="8.268055555555555in" page-height="11.693055555555556in" margin-top="10pt" margin-bottom="20pt" margin-right="20pt" margin-left="20pt">
                    <fo:region-body margin-top="15pt" margin-bottom="25pt"></fo:region-body>
                    <fo:region-before region-name="first-page-header" extent="11in"></fo:region-before>
                    <fo:region-after region-name="first-page-footer" extent="11in" display-align="after"></fo:region-after>
                </fo:simple-page-master>
                <fo:simple-page-master master-name="section1-odd-page" page-width="8.268055555555555in" page-height="11.693055555555556in" margin-top="10pt" margin-bottom="20pt" margin-right="20pt" margin-left="20pt">
                    <fo:region-body margin-top="15pt" margin-bottom="25pt"></fo:region-body>
                    <fo:region-before region-name="odd-page-header" extent="11in"></fo:region-before>
                    <fo:region-after region-name="odd-page-footer" extent="11in" display-align="after"></fo:region-after>
                </fo:simple-page-master>
                <fo:simple-page-master master-name="section1-even-page" page-width="8.268055555555555in" page-height="11.693055555555556in" margin-top="10pt" margin-bottom="20pt" margin-right="20pt" margin-left="20pt">
                    <fo:region-body margin-top="15pt" margin-bottom="25pt"></fo:region-body>
                    <fo:region-before region-name="even-page-header" extent="11in"></fo:region-before>
                    <fo:region-after region-name="even-page-footer" extent="11in" display-align="after"></fo:region-after>
                </fo:simple-page-master>
                <fo:page-sequence-master master-name="section1-page-sequence-master">
                    <fo:repeatable-page-master-alternatives>
                        <fo:conditional-page-master-reference odd-or-even="odd" master-reference="section1-odd-page" />
                        <fo:conditional-page-master-reference odd-or-even="even" master-reference="section1-even-page" />
                    </fo:repeatable-page-master-alternatives>
                </fo:page-sequence-master>
            </fo:layout-master-set>
            <fo:page-sequence master-reference="section1-page-sequence-master" format="1" 
                xmlns:rx="http://www.renderx.com/XSL/Extensions" 
                xmlns:o="urn:schemas-microsoft-com:office:office" 
                xmlns:v="urn:schemas-microsoft-com:vml" 
                xmlns:wx="http://schemas.microsoft.com/office/word/2003/auxHint" 
                xmlns:aml="http://schemas.microsoft.com/aml/2001/core" 
                xmlns:w10="urn:schemas-microsoft-com:office:word" 
                xmlns:dt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882">
                <fo:static-content flow-name="first-page-header">
                    <fo:retrieve-marker retrieve-class-name="first-page-header" retrieve-position="first-including-carryover" retrieve-boundary="page" />
                </fo:static-content>
                <fo:static-content flow-name="first-page-footer">
                    <fo:retrieve-marker retrieve-class-name="first-page-footer" retrieve-position="first-including-carryover" retrieve-boundary="page" />
                </fo:static-content>
                <fo:static-content flow-name="odd-page-header">
                    <fo:retrieve-marker retrieve-class-name="odd-page-header" retrieve-position="first-including-carryover" retrieve-boundary="page" />
                </fo:static-content>
                <fo:static-content flow-name="odd-page-footer">
                    <fo:retrieve-marker retrieve-class-name="odd-page-footer" retrieve-position="first-including-carryover" retrieve-boundary="page" />
                </fo:static-content>
                <fo:static-content flow-name="even-page-header">
                    <fo:retrieve-marker retrieve-class-name="odd-page-header" retrieve-position="first-including-carryover" retrieve-boundary="page" />
                </fo:static-content>
                <fo:static-content flow-name="even-page-footer">
                    <fo:retrieve-marker retrieve-class-name="odd-page-footer" retrieve-position="first-including-carryover" retrieve-boundary="page" />
                </fo:static-content>
                <fo:static-content flow-name="xsl-footnote-separator">
                    <fo:block>
                        <fo:leader leader-pattern="rule" leader-length="144pt" rule-thickness="0.5pt" rule-style="solid" color="gray" />
                    </fo:block>
                </fo:static-content>
                <fo:flow flow-name="xsl-region-body">
                    <fo:block widows="2" orphans="2" font-size="10pt" line-height="1.147" white-space-collapse="false">

                    <!-- Entête 1ère page -->
                        <fo:marker marker-class-name="first-page-header" 
                            xmlns:st1="urn:schemas-microsoft-com:office:smarttags">
                            <fo:block space-after="0pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="11pt" language="FR">

                                <!-- Logo Legrand -->
                                <fo:inline>
                                    <fo:external-graphic content-width="scale-down-to-fit" height="100%" width="450px" scaling="uniform" src="url(&quot;data:image/auto;base64,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&#xA;RU5ErkJggk==&#xA;&quot;)"></fo:external-graphic>
                                </fo:inline>
                                
                                <!-- Logo Fujitsu -->
                                <fo:inline>
                                    <fo:external-graphic content-width="scale-down-to-fit" height="100%" width="450px" scaling="uniform" src="url(&quot;data:image/auto;base64,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&#xA;&quot;)"></fo:external-graphic>
                                </fo:inline>

                            </fo:block>
                        </fo:marker>
                    <!-- Bas de page 1ère page -->
                        <fo:marker marker-class-name="first-page-footer" 
                            xmlns:st1="urn:schemas-microsoft-com:office:smarttags" />
                    <!-- Entête de pages impaires -->
                        <fo:marker marker-class-name="odd-page-header" 
                            xmlns:st1="urn:schemas-microsoft-com:office:smarttags" />
                    <!-- Bas de pages impaires -->
                        <fo:marker marker-class-name="odd-page-footer" 
                            xmlns:st1="urn:schemas-microsoft-com:office:smarttags" />
                    <!-- Entête de pages paires -->
                        <fo:marker marker-class-name="even-page-header" 
                            xmlns:st1="urn:schemas-microsoft-com:office:smarttags" />
                    <!-- Bas de pages paires -->
                        <fo:marker marker-class-name="even-page-footer" 
                            xmlns:st1="urn:schemas-microsoft-com:office:smarttags" />

<!-- Titre de page -->
                        <fo:block space-after="0pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="11pt" language="FR" font-weight="bold">

                            <fo:inline font-family="Arial" font-weight="bold" font-size="18pt" text-align="center" >
                                <fo:leader leader-length="0pt" />ACCEPTANCE REPORT
                            </fo:inline>
                        </fo:block>

<!-- Déclarations Icônes utiles -->
                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="11pt" language="FR" font-weight="bold" 
                            xmlns:st1="urn:schemas-microsoft-com:office:smarttags">
                            <fo:inline>
                                <fo:external-graphic content-width="7.2pt" content-height="7.2pt" src="url(&quot;data:image/auto;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAAGEbayfAAAAAXNSR0IArs4c6QAAAARnQU1BAACx&#xA;jwv8YQUAAABsUExURQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA&#xA;AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA&#xA;AAAAAAAAAHQi/6oAAAAkdFJOUwDD8YoQ5hj+FZ/gp+hTLeUX7TKh/QEc8p6mUj8ZBuT/MSb8E1R2&#xA;qnkAAAAJcEhZcwAAIdUAACHVAQSctJ0AAADHSURBVChTZZEJFoJADEOjqLjhCuIel/vf0aQDKvof&#xA;DCHNlAIAfZS+gF4Cxn3YMomaBjnZA4oIaFWm2Dpox9sjkxXmBAzBVAAfOouZosy9zf5eqtUJoh8t&#xA;0hSMNireXUlsOG71jSP7leTd0p2uGChw9MDgmis0GnLfOvjVb+p2hga9boKfORsW5PzP3pClntu1&#xA;lXycLWxX12mYu5S8PJ8pfSCXGOgLe1YN5amiycRzKGm+bBUiaTr2B9s5s+MPmX9CrSd1yWu8AFCP&#xA;GYdCQucdAAAAAElFTkSuQmCC&#xA;&quot;)" />
                            </fo:inline>
                            <fo:inline>
                                <fo:external-graphic content-width="5.45pt" content-height="5.45pt" src="url(&quot;data:image/auto;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAF7tIdeAAAAAXNSR0IArs4c6QAAAARnQU1BAACx&#xA;jwv8YQUAAABFUExURQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA&#xA;AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANzq6vcAAAAXdFJOUwDxI+atRnzYCozoH/3yiyTnrmJ9&#xA;/9kLZm8UTwAAAAlwSFlzAAAh1QAAIdUBBJy0nQAAAGVJREFUGFe1jtsSgCAIRDE1NdPS0P//1PBa&#xA;j710GGRdgREAASJFqUhZT7o2k1IgimK/CYgB5FH1ImtjoY009bxahgSzsFeHimvCfRJzau7RajPX&#xA;wHClIfbujqOP/ObkdPp14HnKNw72BnbYfQLfAAAAAElFTkSuQmCC&#xA;&quot;)" />
                            </fo:inline>
                            <fo:inline>
                                <fo:external-graphic content-width="7.25pt" content-height="7.25pt" src="url(&quot;data:image/auto;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAAGEbayfAAAAAXNSR0IArs4c6QAAAARnQU1BAACx&#xA;jwv8YQUAAABdUExURQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA&#xA;AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALkHFPAAAAAf&#xA;dFJOUwBvd/krbK3uICj7bnblKqztMnMf9f36ba7kKf8xcvzZZMBKAAAACXBIWXMAACHVAAAh1QEE&#xA;nLSdAAAA9UlEQVQoUzVRiXbDIAzTFpa73TJKL6X8/2dWMqkeOLawjXCAPy2iodMmkdM/UIBshkw+&#xA;JsWJPQMnh7jPysRGW2LRRrWvc95H8XYbOWGpKFk9BGeq42Q/EiDK9mKLc1ekKEBuY0/fBo7BlIf6&#xA;fbm2RqmXMKMf5P/Yl/oSN4S/S3/LeYIJq4Kk27KvvdhgCYuXc9T0wCrVDfX7oFzQlBoLD70rm7Z0&#xA;uyV/R/KlKJ4fbzQmBZojOm5x9oEqdnYo1KSb+kAoLPotveo05oZZwS8HT9QyppBYn3KXpvzE0sYU&#xA;yIWaVuChxH7Pee/lfMhAGq6lXIdQDuAN/nkYCsEgTjYAAAAASUVORK5CYIJ=&#xA;&quot;)" />
                            </fo:inline>
                            <fo:inline>
                                <fo:external-graphic content-width="6pt" content-height="6pt" src="url(&quot;data:image/auto;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAAEWF07zAAAAAXNSR0IArs4c6QAAAARnQU1BAACx&#xA;jwv8YQUAAAAqUExURQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoT&#xA;zogAAAAOdFJOUwAbDeunIrQMIQ7/7LOoC9rK4QAAAAlwSFlzAAAh1QAAIdUBBJy0nQAAAINJREFU&#xA;GFdtT4sSwyAMQuesxfX/f3eBuM67jdOU0DwQoI4DMOJiisXHWfBX/qxWcTlSNUXhUoW1NWcx0A0W&#xA;BpklVDcL8DgzXwWBvvX+sBZWTKsjA1MkMJUIH4G5WKi2Obz1RuNI+xsi/yPp4TvYw/h3OnDk0kI2&#xA;5zFbj0uMLlf9GRR4A71uA9o/hCddAAAAAElFTkSuQmCC&#xA;&quot;)" />
                            </fo:inline>
                        </fo:block>

<!-- Table General Information -->
                        <fo:table font-family="Arial" language="FR" start-indent="0pt" border-top-style="solid" border-top-color="black" border-top-width="0.5pt" border-left-style="solid" border-left-color="black" border-left-width="0.5pt" border-bottom-style="solid" border-bottom-color="black" border-bottom-width="0.5pt" border-right-style="solid" border-right-color="black" border-right-width="0.5pt" 
                            xmlns:st1="urn:schemas-microsoft-com:office:smarttags">
                            <fo:table-column column-number="1" column-width="73.95pt" />
                            <fo:table-column column-number="2" column-width="61.8pt" />
                            <fo:table-column column-number="3" column-width="99.25pt" />
                            <fo:table-column column-number="4" column-width="104.3pt" />
                            <fo:table-column column-number="5" column-width="86.05pt" />
                            <fo:table-column column-number="6" column-width="86.05pt" />
                            <fo:table-body start-indent="0pt" end-indent="0pt">
                                <fo:table-row>
                                    <fo:table-cell padding-top="1pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" number-columns-spanned="6" background-color="#FF0000" display-align="center">
                                        <fo:block space-after="0pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="12pt" language="FR" font-weight="bold">
                                            <fo:inline font-family="Arial" font-weight="bold" color="#FFFFFF" font-size="14pt">
                                                <fo:leader leader-length="0pt" />General Information
                                            </fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="FR">
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />Location :
                                                <xsl:value-of select="location_info_site_name"/>
                                            </fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" number-columns-spanned="2" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="FR">
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />
        Digiem | Belgium</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="FR">
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />
        Date :</fo:inline>
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />
        14/11/2018</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="FR">
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />
        Start Hour :</fo:inline>
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />
        08:00</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="FR">
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />
        End Hour :</fo:inline>
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />
        10:00</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="FR">
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />
        User Name :</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" number-columns-spanned="5" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="FR">
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />
        TRUCMUCHE Roger</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="FR">
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />
        Legrand ref.</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="FR">
                                            <fo:leader />
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="FR">
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />
        CRQ :</fo:inline>
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />
        CRQ-XXXXXX</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="FR">
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />
        INC :</fo:inline>
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />
        INC-YYYYYY</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        OSS ref.:</fo:inline>
                                            <fo:inline font-family="Arial"  font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        ZZZZZZ</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:leader />
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" number-columns-spanned="2" background-color="#F2F2F2">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="FR">
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />
        New computer installation</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="FR">
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />
        Computer swap</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="FR">
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />
        Computer Reimaging</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="FR">
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />
        PC issue</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="FR">
                                            <fo:inline font-family="Arial" font-size="8pt">
                                                <fo:leader leader-length="0pt" />
        Other issue</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Old PC status</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        End of life</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Dell Repair</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Spare</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" number-columns-spanned="2" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Other</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                            </fo:table-body>
                        </fo:table>
                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="11pt" language="FR" font-weight="bold" 
                            xmlns:st1="urn:schemas-microsoft-com:office:smarttags">
                            <fo:leader />
                        </fo:block>
                        <fo:table font-family="Arial" language="FR" start-indent="0pt" text-align="center" border-top-style="solid" border-top-color="black" border-top-width="0.5pt" border-left-style="solid" border-left-color="black" border-left-width="0.5pt" border-bottom-style="solid" border-bottom-color="black" border-bottom-width="0.5pt" border-right-style="solid" border-right-color="black" border-right-width="0.5pt" 
                            xmlns:st1="urn:schemas-microsoft-com:office:smarttags">
                            <fo:table-column column-number="1" column-width="135.75pt" />
                            <fo:table-column column-number="2" column-width="133.35pt" />
                            <fo:table-column column-number="3" column-width="128.9pt" />
                            <fo:table-column column-number="4" column-width="113.4pt" />
                            <fo:table-body start-indent="0pt" end-indent="0pt">
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" number-columns-spanned="4" background-color="#FF0000">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="12pt" language="FR" font-weight="bold">
                                            <fo:inline font-family="Arial" font-weight="bold" color="#FFFFFF" font-size="14pt">
                                                <fo:leader leader-length="0pt" />
        User Data Backup</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" number-columns-spanned="4" background-color="#FFFFFF">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="10pt" language="EN-US" font-weight="bold">
                                            <fo:inline font-family="Arial" font-weight="bold" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Place all user’s data in Onedrive. Wait for the synchronization to succeed. </fo:inline>
                                            <fo:inline font-family="Arial" font-weight="bold" font-size="8pt" language="EN-US">
                                                <fo:block />
                                                <fo:leader leader-length="0pt" />
        If not possible for now, use an external hard drive. </fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        My documents</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        If used : Lotus Notes</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Desktop</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US" text-align="right">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Office templates</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Favorites Internet Explorer</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Other local data (check with the user)</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Favorites Google Chrome</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US" font-weight="bold">
                                            <fo:leader />
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                            </fo:table-body>
                        </fo:table>
                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="11pt" language="EN-US" start-indent="35.4pt" text-align="right" font-weight="bold" 
                            xmlns:st1="urn:schemas-microsoft-com:office:smarttags">
                            <fo:inline font-weight="bold" language="EN-US">
                                <fo:leader leader-pattern="space" leader-length="NaNpt" />
                            </fo:inline>
                            <fo:inline font-weight="bold" language="EN-US">
                                <fo:leader leader-pattern="space" leader-length="NaNpt" />
                                <fo:leader leader-length="0pt" />
                            </fo:inline>
                        </fo:block>
                        <fo:table font-family="Arial" language="FR" start-indent="0pt" text-align="center" border-top-style="solid" border-top-color="black" border-top-width="0.5pt" border-left-style="solid" border-left-color="black" border-left-width="0.5pt" border-bottom-style="solid" border-bottom-color="black" border-bottom-width="0.5pt" border-right-style="solid" border-right-color="black" border-right-width="0.5pt" 
                            xmlns:st1="urn:schemas-microsoft-com:office:smarttags">
                            <fo:table-column column-number="1" column-width="135.75pt" />
                            <fo:table-column column-number="2" column-width="133.35pt" />
                            <fo:table-column column-number="3" column-width="128.9pt" />
                            <fo:table-column column-number="4" column-width="113.4pt" />
                            <fo:table-body start-indent="0pt" end-indent="0pt">
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" number-columns-spanned="4" background-color="#FF0000">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="12pt" language="FR" font-weight="bold">
                                            <fo:inline font-family="Arial" font-weight="bold" color="#FFFFFF" font-size="14pt">
                                                <fo:leader leader-length="0pt" />
        PC Configuration</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        BIOS password (for laptops)</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Software Detail</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Lotus Notes (if required)</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Software configuration (if required) </fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Software Installation (if required)</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        One Drive data restore</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Domain integration</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Skype</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Printers Installation </fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Office version </fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:leader />
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US" font-weight="bold">
                                            <fo:leader />
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                            </fo:table-body>
                        </fo:table>
                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="11pt" language="EN-US" font-weight="bold" 
                            xmlns:st1="urn:schemas-microsoft-com:office:smarttags">
                            <fo:leader />
                        </fo:block>
                        <fo:table font-family="Arial" language="FR" start-indent="0pt" text-align="center" border-top-style="solid" border-top-color="black" border-top-width="0.5pt" border-left-style="solid" border-left-color="black" border-left-width="0.5pt" border-bottom-style="solid" border-bottom-color="black" border-bottom-width="0.5pt" border-right-style="solid" border-right-color="black" border-right-width="0.5pt" 
                            xmlns:st1="urn:schemas-microsoft-com:office:smarttags">
                            <fo:table-column column-number="1" column-width="135.75pt" />
                            <fo:table-column column-number="2" column-width="133.35pt" />
                            <fo:table-column column-number="3" column-width="128.9pt" />
                            <fo:table-column column-number="4" column-width="113.4pt" />
                            <fo:table-body start-indent="0pt" end-indent="0pt">
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" number-columns-spanned="4" background-color="#FF0000">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="12pt" language="FR" font-weight="bold">
                                            <fo:inline font-family="Arial" font-weight="bold" color="#FFFFFF" font-size="14pt">
                                                <fo:leader leader-length="0pt" />
        Test with the user</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" number-columns-spanned="4" background-color="#FFFFFF">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="10pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-weight="bold" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Check if all application are presents.</fo:inline>
                                            <fo:inline font-family="Arial" font-size="7pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
                                            </fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Login with user’s profile</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        WIFI connection</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Lotus Notes (archives, database)</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Software configuration (if required) </fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Dialeg Intranet Access</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Office365 mail Access (with chrome)</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Show Software Center</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Printing test (user’s default printer)</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        AS400 login </fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Skype is working</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        User password was changed </fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:leader />
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                            </fo:table-body>
                        </fo:table>
                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="11pt" language="EN-US" font-weight="bold" 
                            xmlns:st1="urn:schemas-microsoft-com:office:smarttags">
                            <fo:leader />
                        </fo:block>
                        <fo:table font-family="Arial" language="FR" start-indent="0pt" text-align="center" border-top-style="solid" border-top-color="black" border-top-width="0.5pt" border-left-style="solid" border-left-color="black" border-left-width="0.5pt" border-bottom-style="solid" border-bottom-color="black" border-bottom-width="0.5pt" border-right-style="solid" border-right-color="black" border-right-width="0.5pt" 
                            xmlns:st1="urn:schemas-microsoft-com:office:smarttags">
                            <fo:table-column column-number="1" column-width="135.75pt" />
                            <fo:table-column column-number="2" column-width="133.35pt" />
                            <fo:table-column column-number="3" column-width="128.9pt" />
                            <fo:table-column column-number="4" column-width="113.4pt" />
                            <fo:table-body start-indent="0pt" end-indent="0pt">
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" number-columns-spanned="4" background-color="#FF0000">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="12pt" language="FR" font-weight="bold">
                                            <fo:inline font-family="Arial" font-weight="bold" color="#FFFFFF" font-size="14pt">
                                                <fo:leader leader-length="0pt" />
        CMDB Database Information</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" number-columns-spanned="2" background-color="#F2F2F2">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US" text-align="center" font-weight="bold">
                                            <fo:inline font-family="Arial" font-weight="bold" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Current PC info</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" number-columns-spanned="2" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US" text-align="center" font-weight="bold">
                                            <fo:inline font-family="Arial" font-weight="bold" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        New PC info</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Current PC name:</fo:inline>
                                        </fo:block>
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="11pt" language="FR">
                                            <fo:leader />
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="11pt" language="FR">
                                            <fo:leader />
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        New PC  name :</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US" font-weight="bold">
                                            <fo:leader />
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Current PC model:</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:leader />
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        New PC model:</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US" font-weight="bold">
                                            <fo:leader />
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Current PC serial number:</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:leader />
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        New PC  serial number :</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US" font-weight="bold">
                                            <fo:leader />
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Windows 7 </fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Windows 10</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Windows 7</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US" font-weight="bold">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Windows 10</fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row text-align="center">
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        Remarks </fo:inline>
                                            <fo:inline font-family="Arial" font-size="8pt" language="EN-US">
                                                <fo:leader leader-length="0pt" />
        : </fo:inline>
                                        </fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding-top="0pt" padding-left="5.4pt" padding-bottom="0pt" padding-right="5.4pt" border-left-style="solid" border-right-style="solid" border-left-color="black" border-right-color="black" border-left-width="0.25pt" border-right-width="0.25pt" border-top-style="solid" border-bottom-style="solid" border-top-color="black" border-bottom-color="black" border-top-width="0.25pt" border-bottom-width="0.25pt" number-columns-spanned="3" background-color="#F2F2F2" display-align="center">
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:leader />
                                        </fo:block>
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:leader />
                                        </fo:block>
                                        <fo:block space-after="10pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="8pt" language="EN-US">
                                            <fo:leader />
                                        </fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                            </fo:table-body>
                        </fo:table>
                        <fo:block space-after="0pt" space-after.conditionality="retain" line-height="1.147" font-family="Arial" font-size="11pt" language="EN-US" 
                            xmlns:st1="urn:schemas-microsoft-com:office:smarttags">
                            <fo:leader />
                        </fo:block>
                    </fo:block>
                    <fo:block id="IDLVLY4KOR0VQVJPLQT4KBHZHWAFLUFZDV3C3RQFKJAWOMBNALHW3D" />
                </fo:flow>
            </fo:page-sequence>
        </fo:root>
    </xsl:template>  
</xsl:stylesheet>