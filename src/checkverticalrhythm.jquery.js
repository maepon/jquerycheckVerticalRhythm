/*! jQuery.checkVerticalRhythm - v0.1.0 - 2014-02-06
* https://github.com/maepon/jqueryflatheightall
*/
/*@preserve Copyright (c) 2014 Masayuki Maekawa Licensed MIT*/

(function($){

    'use strict';

    var defaults = {
        baseTextClass:          '',
        baseTextParentSelector: '',
        checkTextStr:           'N',
        lineColor:              'rgba(0,0,0,.3)',
        lineStartOffset:        0,
        maxLineNum:             100
    };

    $.fn.checkVerticalRhythm = function(options){
        var opt                         = $.extend( {}, defaults, options ),
            $doc                        = $(document),
            docWid                      = $doc.width(),
            docHei                      = $doc.height(),
            $checkParent                = opt.baseTextParentSelector === '' ? $('body') : $(opt.baseTextParentSelector),
            $checkDom                   = opt.baseTextClass === '' ? $('<p>') : $('<p class="' + opt.baseTextClass + '">'),
            baseLineHeight              = 0,
            i                           = 0,
            lineParentCSSPosition       = $checkParent.css('position') === 'relative' || $checkParent.css('position') === 'absolute' ? false : 'relative',
            $lineDiv                    = $('<div class="js-checkVerticalRhythm-line">').css({
                                                        position:        'absolute',
                                                        width:           docWid,
                                                        height:          '1px',
                                                        left:            0,
                                                        overflow:        'hidden',
                                                        backgroundColor: opt.lineColor
                                                    });

        $('.js-checkVerticalRhythm-line').remove();

        if (lineParentCSSPosition !== false){
            $checkParent.css('position','relative');
        }

        $checkParent.eq(0).append($checkDom.text(opt.checkTextStr));
        baseLineHeight = $checkDom.height();
        $checkDom.remove();

        for (i = 0;i <= Math.floor(docHei / baseLineHeight);i++){
            var $insLineDiv = $lineDiv.clone();
            $insLineDiv.css('top', (i * baseLineHeight + opt.lineStartOffset) + 'px');
            $checkParent.append($insLineDiv);
            if (i >= opt.maxLineNum && opt.maxLineNum !== 0){
                break;
            }
        }
    };
}(jQuery));
