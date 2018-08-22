/**
 * 展示目录
 */
function showCatalog(){

    if(document.getElementById('md-catalog').style.display){
        document.getElementById('md-catalog').style.display = ''
    }else{
        createDiretory('markdown-preview', 'md-catalogContent')
        document.getElementById('md-catalog').style.display = 'block'
    }
}

/**
 * 创建目录
 * @param contentId
 * @param directoryId
 */
function createDiretory(contentId, directoryId) {

    var minLevel = 6;
    $("#" + directoryId).html('');
    $('#' + contentId).children().each(function (index, node) {

        var tagName = $(this).get(0).tagName;

        if(tagName.substr(0,1).toLowerCase() === "h"){
            var contentH = $(this).html();
            var level=tagName.substr(1,1);
            if(level <= minLevel){
                minLevel = level;
            }else{
                //缩进的长度
                for(var i=1;i<level;i++){
                    contentH="&nbsp;&nbsp;" + contentH;
                }
            }
            //添加id
            var hID = "Title-"+tagName+"-"+index.toString();
            $(this).attr("id",hID);
            hID = "#" + hID;
            //在目标DIV中添加 li
            $("#" + directoryId).append("<li><a href='"+hID+"'>"+contentH+"</a></li>");
        }

    })

    // $("[href='#']").click(function(){
    //
    //     $('#' + contentId).animate({scrollTop:0},300);
    //     return false;
    //
    // });

    $("[href^='#Title']").click(function(){

        selectedOption(directoryId, $(this)[0])
        var var_href = $(this).attr("href");
        var len_href = var_href.length;
        var has_mao = var_href.search("#");
        if ( has_mao === '-1' ) {
            return;
        }

        var index_mao = var_href.lastIndexOf("#");
        var sub_href = var_href.substr(index_mao,len_href-index_mao)
        if (sub_href === '#Title-H1-0' && $('#' + contentId).scrollTop() === 0) {
        }else{

            if ($('#' + contentId).scrollTop() === 0) {
                var scrollTop = $('#' + contentId).scrollTop() + $(sub_href).offset().top - 50 + 'px';
            }else{
                var scrollTop = $('#' + contentId).scrollTop() + $(sub_href).offset().top - 10 + 'px';
            }
            $('#preview_scrollbar').animate({scrollTop:scrollTop},300);
            $('#' + contentId).animate({scrollTop:scrollTop},300);

        }
        return false;

    });
}

/**
 * 选中样式
 * @param id
 * @param node
 */
function selectedOption(id, node) {

    $('#' + id).children().each(function (index, node) {

        if(node.classList.contains('selected')){

            node.classList.remove('selected');

        }

    });
    node.parentNode.classList.add('selected');

}

/**
 * 保存文件
 */
function saveText() {

    var a = document.createElement('a');
    a.setAttribute('href','data:text/html;gb2312,'+ md_editor.getValue());
    a.setAttribute('download', 'demo.md');
    a.setAttribute('target','_blank');
    a.style.display="none";
    $('#markdown-editor').append(a);
    a.click();

}

/**
 * 快捷输入
 * @param value
 * @param type
 */
function insertText(value,type){

    var text =  md_editor.session.getTextRange(md_editor.getSelectionRange());
    md_editor.insert(value.replace('?',text));
    if(type === 'code'){

        var lineNumber = md_editor.selection.getCursor();
        md_editor.gotoLine(lineNumber);

    }

}



/**
 * 全屏展示
 */
function fullScreen() {

    if ($('#editor-column')[0].style.width !== '100%') {

        $('#editor-column')[0].style.width = '100%';
        $('#preview-column')[0].style.width = '0%';
        $('#preview-column')[0].style.paddingLeft = '0px';
        $('#editor-toolbar')[0].style.width = '100%'
        md_editor.setOption("wrap", "150")

    }else{

        $('#editor-column')[0].style.width = '50%';
        $('#preview-column')[0].style.width = '50%';
        $('#editor-toolbar')[0].style.width = '50%';
        md_editor.setOption("wrap", "free")

    }

}


