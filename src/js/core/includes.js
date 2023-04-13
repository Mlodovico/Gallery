import $ from "jquery"

function loadIncludes(parent) {
    if(!parent) parent = 'body'
    $(parent).find('[include]').each(function (index, element) {
        const url = $(element).attr('include')

        $.ajax({
            url,
            success(data) {
                $(element).html(data)
                $(element).removeAttr('include')

                loadIncludes(element)
            }
        })
    })
}

loadIncludes()