const config = hexo.config.hexo_external_link = Object.assign({
    enable: false,
    enable_base64_encode: false,
    url_param_name: 'u',
    html_file_name: 'go.html',
    target_blank: true,
    link_rel: 'external nofollow noopener noreferrer'
}, hexo.config.hexo_external_link);
const domain = hexo.config.domain;
const root = hexo.config.root || '/';
if (config.enable) {
    hexo.extend.filter.register('after_render:html', function (htmlContent) {
        let injectExtraScript = function () {
            return `
            <script src="//cdn.jsdelivr.net/npm/js-base64/base64.min.js"></script>
            <script>
            $('a').each(function() {
              const $this = $(this);
              const href = $this.attr('href');
              if (href && href.match('^((http|https|thunder|qqdl|ed2k|Flashget|qbrowser|ftp|rtsp|mms)://)')) {
                const strs = href.split('/');
                if (strs.length >= 3) {
                    const host = strs[2];
                    if (host !== '${domain}') {
                        $this.attr('href', '${root}${config.html_file_name}?${config.url_param_name}=${config.enable_base64_encode ? "'+Base64.encode(href)+'" : "'+href+'"}').attr('rel', '${config.link_rel}');
                        if (${config.target_blank}) {
                            $this.attr('target', '_blank');
                        }
                    }
                }
              }
            });
            </script>`;
        };
        if (/<\/body>/gi.test(htmlContent)) {
            let lastIndex = htmlContent.lastIndexOf('</body>');
            htmlContent = htmlContent.substring(0, lastIndex) + injectExtraScript() + htmlContent.substring(lastIndex, htmlContent.length);
        }
        return htmlContent;
    });
    hexo.extend.generator.register('external_link', require('./lib/generator'));
}
