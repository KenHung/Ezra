(function () {
    addScript('https://code.jquery.com/jquery-1.12.4.min.js');
    addScript('https://code.jquery.com/ui/1.12.1/jquery-ui.min.js');
    addLink('https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css');
    addLink('https://cdn.rawgit.com/KenHung/Ezra/0.2/ezra-style.css');
    addScript('https://cdn.rawgit.com/KenHung/Ezra/0.2/ezra.js', () => {
        var ezraExecute = document.createElement('script');
        ezraExecute.innerText = 'ezraLinkifier.linkify(document.body);';
        document.body.appendChild(ezraExecute);
    });

    function addScript(src, onload) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        if (onload) {
            script.onload = onload;
        }
        document.body.appendChild(script);
    }
    function addLink(href) {
        var link = document.createElement('link');
        link.href = href;
        link.rel = 'stylesheet';
        document.body.appendChild(link);
    }
})();