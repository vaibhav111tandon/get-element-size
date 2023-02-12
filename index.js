function getElementSize(elem) {
    
    const DIMENSIONS = {
        paddingLeft: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        marginLeft: 0,
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        elementWidth: 0,
        elementHeight: 0,
    };

    let elementRef;
    let elementStyle;
    let elementDimensions = {};
    let isBorderBox;

    if(typeof elem === 'string') {
        elementRef = document.querySelector(elem);
    }else{
        throw 'Bad format of element selector passed';
    }
    if(elementRef){
        elementStyle = getComputedStyle(elementRef);
        if(elementStyle.display === 'none') {
            
        }else{
            elementDimensions.width = elementRef.offsetWidth;
            elementDimensions.height = elementRef.offsetHeight;
            isBorderBox = elementStyle.boxSizing === 'box-sizing';
            elementDimensions.paddingWidth = elementStyle.paddingLeft + elementStyle.paddingRight;
            elementDimensions.paddingHeight = elementStyle.paddingTop + elementStyle.paddingBottom;
            elementDimensions.marginWidth = elementStyle.marginLeft + elementStyle.marginRight;
            elementDimensions.marginHeight = elementStyle.marginTop + elementStyle.marginBottom;
            elementDimensions.borderWidth = elementStyle.borderLeftWidth + elementStyle.borderRightWidth;
            elementDimensions.borderHeight = elementStyle.borderTopWidth + elementStyle.borderBottomWidth;


            if(getSize(elementStyle.width)) elementDimensions.width = getSize(elementStyle.width) + (isBorderBox ? 0 : getSize(elementDimensions.paddingWidth) + getSize(elementDimensions.borderWidth));
            if(getSize(elementStyle.height)) elementDimensions.height = getSize(elementStyle.height) + (isBorderBox ? 0 : getSize(elementDimensions.paddingHeight) + getSize(elementDimensions.borderHeight));

            DIMENSIONS.paddingLeft = getSize(elementStyle.paddingLeft);
            DIMENSIONS.paddingRight = getSize(elementStyle.paddingRight);
            DIMENSIONS.paddingTop = getSize(elementStyle.paddingTop);
            DIMENSIONS.paddingBottom = getSize(elementStyle.paddingBottom);
            DIMENSIONS.marginLeft = getSize(elementStyle.marginLeft);
            DIMENSIONS.marginRight = getSize(elementStyle.marginRight);
            DIMENSIONS.marginTop = getSize(elementStyle.marginTop);
            DIMENSIONS.marginBottom = getSize(elementStyle.marginBottom);
            DIMENSIONS.borderLeftWidth = getSize(elementStyle.borderLeftWidth);
            DIMENSIONS.borderRightWidth = getSize(elementStyle.borderRightWidth);
            DIMENSIONS.borderTopWidth = getSize(elementStyle.borderTopWidth);
            DIMENSIONS.borderBottomWidth = getSize(elementStyle.borderBottomWidth);
            DIMENSIONS.elementWidth = elementDimensions.width;
            DIMENSIONS.elementHeight = elementDimensions.height;

            return DIMENSIONS;
        }
    }else{
        return;
    }

    function getSize(size){
        if(size.indexOf('px')){
            size = size.substr(0, size.length - 2);
        }
        let value = parseFloat(size);
        return size.indexOf('%') == -1 && !isNaN(size) && value;
    }
}