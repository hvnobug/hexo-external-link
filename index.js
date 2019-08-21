const cheerio = require('cheerio');
const Base64 = require('js-base64').Base64;
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
const UrlReg = '^((http|https|thunder|qqdl|ed2k|Flashget|qbrowser|ftp|rtsp|mms)://)';
if (config.enable) {
    hexo.extend.filter.register('before_generate', function () {
        hexo.extend.filter.register('after_render:html', data => {
            const $ = cheerio.load(data);
            $('a').each(function (i, elem) {
                const href = $(elem).attr('href');
                if (href && href.match(UrlReg)) {
                    const strs = href.split('/');
                    if (strs.length >= 3) {
                        const host = strs[2];
                        if (host !== domain) {
                            $(elem).attr('href', `${root}${config.html_file_name}?${config.url_param_name}=${config.enable_base64_encode ? Base64.encode(href) : href}`)
                                .attr('rel', config.link_rel);
                            if (config.target_blank) {
                                $(elem).attr('target', '_blank');
                            }
                        }
                    }
                }
            });
            return $.html();
        })
    });
    hexo.extend.generator.register('external_link', require('./lib/generator'));
}
