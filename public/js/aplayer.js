// var colors = require("../../node_modules/color-thief/js");
// // var playlist = require("./")

var options = {
    container: document.getElementById("player"),

    // listFolded: true,
    // listMaxHeight: 100,

    // autoplay: false,
    // loop: "none",
    // prelaod: "auto",
    // mutex: true,

    fixed: true,
    // mini: false,

    // order: "list",
    
    music: [
        {
            title: "just playing some pokemon blue",
            author: "Seth Everman",
            url: "/home/hoot/Music/just_playing_some_pokémon_blue.mp3",
            pic: "/home/hoot/Pictures/blastoise.jpg",
            theme: "#c4daff"
        }
    ]
};

const player = new APlayer(options);

const setTheme = function(index) {
    if(!player.list.audios[index].theme) {
        colors.getColorAsync(player.list.audios[index].cover, function(color) {
            player.theme(`rgb(${color[0]}, ${color[1]}, ${color[2]})`)
        });
    }
};

setTheme(player.list.index);
player.on("listswitch", function(data) {
    setTheme(data.index);
});

/**
 * todo : add function to change 
 */