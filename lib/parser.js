function cleanFilename(name) {
    name = name.trim();

    // get rid of things in [] and (), as well as file extensions
    var result = name.replace(/(((\[|\()(.*?)(\]|\)))|(\.(\w+))$)/g, '');
    
    // replace underscores, dots with single space
    result = result.replace(/(_|\.)/g, ' ');

    // some files like to have v_ after the ep number, e.g. 12v2
    // hopefully doesn't break anything..?
    result = result.replace(/v\d/g, '');
  
    // if they snuck a 'Ep 5' or 'Episode 5' somewhere
    var nameWithEp = result.match(/(.*)(ep|episode)\s*\d+/gi);
    if(nameWithEp) {
        result = nameWithEp[0];
    }

    // replace 720p/1080p/etc, bluray, HD/FHD, x264...
    result = result.replace(/(\d+p|bluray|hd|fhd|(x264(.*)))/gi, '');

    // detects dashes AFTER numbers, strips after dash (remove ep title)
    // but in rare case of "NUM - Episode NUM", keep the "Episode NUM"
    //var epTitleGone = result.match(/(.*)(\d+ - ((ep|episode) \d+)?)|(?!.*)/gi);
    var epTitleGone = result.match(/(.*)(\d+ - (((ep|episode) )?\d+)?)|(?!.*)/gi);
    if(epTitleGone) {
        result = epTitleGone[0];
    }

    // removes trailing dashes
    result = result.replace(/(-\s*)$/g, '');

    // shortens whitespace to one space
    result = result.replace(/[\s]+/g, ' ');
    
    return result.trim();
}

function getEpisodeNumber(name) {
    // get rid of everything except for last number
    var result = name.match(/[0-9]+$/g);
    
    // no number? probably a movie/OVA...
    if(!result) {
        result = 1;
    }

    return +result;
}

function getTitle(name) {
    // get rid of "ep"/"episode", episode number
    var result = name.replace(/(((ep|episode)\.?)?\s?\d+)$/gi, '');

    // removes trailing dash, if any
    result = result.trim().replace(/-$/g, '');

    return result.trim();
}

function querify(name) {
    // removes dashes
    var result = name.replace(/-/g, '');
    
    // replace spaces with pluses
    return result.replace(/[\s]+/g, '+');
}

exports.cleanFilename = cleanFilename;
exports.getEpisodeNumber = getEpisodeNumber;
exports.getTitle = getTitle;
exports.querify = querify;
