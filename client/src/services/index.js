export const handleDisabledScroll = () => {
    const x = window.scrollX;
    const y = window.scrollY;

    window.onscroll = function(){
        window.scrollTo(x, y)
    }
  }

export const handleEnableScroll = () => {
    window.onscroll = function(){ }
 }