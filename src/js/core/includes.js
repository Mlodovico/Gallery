import $ from "jquery"

const loadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(callback) {
    if(!loadHtmlSuccessCallbacks.includes(callback)) {
        loadHtmlSuccessCallbacks.push(callback)
    }
}

function loadIncludes(parent) {
    if(!parent) parent = 'body'
    $(parent).find('[include]').each(function (index, element) {
        const url = $(element).attr('include')

        $.ajax({
            url,
            success(data) {
                $(element).html(data)
                $(element).removeAttr('include')

                loadHtmlSuccessCallbacks.forEach(callback => callback(data))
                loadIncludes(element)
            }
        })
    })
}

loadIncludes()