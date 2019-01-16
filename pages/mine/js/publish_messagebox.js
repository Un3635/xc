function confim(confirmBox, ctrlStr, articleTitle) {
    return confirmBox('', '', {
        confirmButtonText: '确定' + ctrlStr,
        cancelButtonText: '取消',
        cancelButtonClass: 'publish_messagebox_cancelbt',
        confirmButtonClass: 'publish_messagebox_corfirmlbt',
        showClose: false,
        dangerouslyUseHTMLString: true,
        message: `<div class="t">${articleTitle}</div>
        <div class="ok">确认<span>${ctrlStr}</span>文章?</div>`,
        center: true,
        customClass: 'publish_messagebox'
    })
}

export {
    confim
};