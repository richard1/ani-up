var assert = require("assert");

var parser = require('../parser')

var fileNames = [
    '[UTW] Fate Stay Night - Unlimited Blade Works [BD][h264-1080p FLAC][D7A47961].mkv', 
    '[UTW]_Fate_Zero_-_Einzbern_Consultation_Room_Special_-_01_[BD][h264-720p_AC3][6A781142].mkv', 
    '[FTW]_21-ji no Onna: Newscaster Katsuragi Miki_[BD][h264-1080p][FLAC][7AD266D3].mkv', 
    '[FTW]_Mahou Shoujo Madoka Magica Movie 3: Hangyaku no Monogatari_[BD][h264-1080p][FLAC][7AD266D3].mkv', 
    '[FTW]_Chuunibyou_demo_Koi_ga_Shitai!_The_Movie_Lite_[BD][h264-1080p][FLAC][7AD266D3].mkv', 
    '[Chibiki]_THE_iDOLM@STER_-_10_[480p][52B74250].mkv', 
    '[Doki]_11eyes_-_03_[W13O37W].mp4', 
    '[Doki] Clannad After Story - 18 (848x480 h264 BD AAC) [03F4FD77].mkv', 
    '[UTW]_White_Album_2_-_12_[h264-480p][FA8B0E88].mp4', 
    '[Rockman-X] Rozen Maiden Traumend - Episode 05 - Der brief (x264+vorbis) [R2 DVDrip+manhole-desu subs] [DF130DBC].mkv', 
    '[DBNL]Gundam_0080_-_Episode_5_-_Say_It_Ain_t_So,_Bernie_-_[x264][CE428F33].mkv', 
    '[Doremi].Kindaichi.Case.Files.Episode.034.[640x480].[FBDB06E5].mkv', 
    '[URW]_Chuunibyou_demo_Koi_ga_Shitai!_-_OVA_[BD][720p][55C22F0C].mkv', 
    '[UTW-Mazui]_Toaru_Majutsu_no_Index_II_-_23v3_[720p][0A6309A4].mkv', 
    '[66]_Kara_no_Kyoukai_-_4_(720p,BluRay)_[8A24AC6C].mkv', 
    '[gg-TakaJun]_Kara_no_Kyoukai_-_The_Garden_of_Sinners_-_06_[238F9CE7].mkv', 
    'Sen.to.Chihiro.no.kamikakushi.2001.1080p.BluRay.x264-CtrlHD.mkv', 
    '[Exiled-Destiny]_Hack_Quantum_Extras_Ep06_Subbed_[BD_720p_8bit]_(72A525DA).mkv', 
    '[Vegapunk]_One_Piece_322_HD_[F68AA376].mp4', 
    '[Vegapunk]_One_Piece_334_FHD_v2_[42DE5B45].mp4', 
    '[Vivid-Taku] The World God Only Knows - Magical Star Kanon 100% [HDTV 720p AAC] [A6A677E9].mkv', 
    '[Wasurenai] Mari & Gali Ver. 2.0 - 02 [XviD 704x400] [9EE20C38].avi', 
    '[Underwater] KILL la KILL 19 - Raindrops Keep Falling On My Head (TV 720p) [C1E78BA4].mkv', 
    'Bakemonogatari_Ep07_[1080p,BluRay,x264]_-_qIIq-THORA.mkv'
];

var titles = [
    'Fate Stay Night - Unlimited Blade Works', 
    'Fate Zero - Einzbern Consultation Room Special', 
    '21-ji no Onna: Newscaster Katsuragi Miki', 
    'Mahou Shoujo Madoka Magica Movie 3: Hangyaku no Monogatari', 
    'Chuunibyou demo Koi ga Shitai! The Movie Lite', 
    'THE iDOLM@STER', 
    '11eyes', 
    'Clannad After Story', 
    'White Album 2', 
    'Rozen Maiden Traumend', 
    'Gundam 0080', 
    'Kindaichi Case Files', 
    'Chuunibyou demo Koi ga Shitai! - OVA', 
    'Toaru Majutsu no Index II', 
    'Kara no Kyoukai', 
    'Kara no Kyoukai - The Garden of Sinners', 
    'Sen to Chihiro no kamikakushi', 
    'Hack Quantum Extras', 
    'One Piece', 
    'One Piece', 
    'The World God Only Knows - Magical Star Kanon 100%', 
    'Mari & Gali Ver 2 0', 
    'KILL la KILL', 
    'Bakemonogatari'
];

var episodeNums = [
    '1', '1', '1', '1', '1', '10', '3', '18', '12', '5', '5', '34', '1', 
    '23', '4', '6', '2001', '6', '322', '334', '1', '2', '19', '7'
];

var cleaned = []

describe('Parser', function() {
    before(function() {
        for(var i = 0; i < fileNames.length; i++) {
            cleaned.push(parser.cleanFilename(fileNames[i]));
        }
    });

    describe('#getTitle()', function() {
        it('should parse the title correctly', function() {
            for(var i = 0; i < fileNames.length; i++) {
                assert.equal(
                    parser.getTitle(cleaned[i]), 
                    titles[i]
                );
            }
        });
    });

    describe('#getEpisodeNumber()', function() {
        it('should parse the episode number correctly', function() {
            for(var i = 0; i < fileNames.length; i++) {
                assert.equal(
                    parser.getEpisodeNumber(cleaned[i]), 
                    episodeNums[i]
                );
            }
        });
    });
});
