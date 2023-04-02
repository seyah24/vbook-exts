load('config.js');
function execute(key, page) {
    if(!page) page = '1';
    let response = fetch(BASE_URL+"/search/"+key+"/"+page);

    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("script").html().split("cleanEntities('\/search\/")[1].split("');")[0]
        next = next.split(/[/ ]+/).pop();        
		doc.select(".SHsectionThree-middle p").forEach(e => {
            data.push({
                name: e.select("a.g").first().attr("title"),
                link: e.select("a").get(1).attr("href"),
                description: e.select("a").last().text(),
                host: BASE_URL
            })
        });

        return Response.success(data,next);
    }
    return null;
}