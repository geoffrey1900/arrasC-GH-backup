// GUN DEFINITIONS

const combineStats = function(arr) {
    try {
        // Build a blank array of the appropiate length
        let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        arr.forEach(function(component) {
            for (let i = 0; i < data.length; i++) {
                data[i] = data[i] * component[i];
            }
        });
        return {
            reload: data[0],
            recoil: data[1],
            shudder: data[2],
            size: data[3],
            health: data[4],
            damage: data[5],
            pen: data[6],
            speed: data[7], 
            maxSpeed: data[8],
            range: data[9],
            density: data[10],
            spray: data[11],
            resist: data[12],
        };
    } catch (err) {
        console.log(err);
        console.log(JSON.stringify(arr));
    }
};
const skillSet = (() => {
    let config = require('../../../config.json');
    let skcnv = {
        rld: 0,
        pen: 1,
        str: 2,
        dam: 3,
        spd: 4,
        shi: 5,
        atk: 6,
        hlt: 7,
        rgn: 8,
        mob: 9,
    };
    return args => {
        let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let s in args) {
            if (!args.hasOwnProperty(s)) continue;
            skills[skcnv[s]] = Math.round(config.MAX_SKILL * args[s]);
        }
        return skills;
    };
})();

const g = { // Gun info here 
    trap:               [36,    1,     0.25,   0.6,    1,      0.75,   1,      5,      1,      1,      1,      15,     3], 
    swarm:              [18,    0.25,  0.05,   0.4,    1,      0.75,   1,      4,      1,      1,      1,      5,      1],  
    drone:              [50,    0.25,  0.1,    0.6,    1,      1,      1,      2,      1,      1,      1,      0.1,    1], 
    factory:            [60,    1,     0.1,    0.7,    1,      0.75,   1,      3,      1,      1,      1,      0.1,    1], 
    basic:              [18,    1.4,   0.1,    1,      1,      0.75,   1,      4.5,    1,      1,      1,      15,     1],  
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    blank:              [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
        spam:           [1.1,   1,     1,      1.05,   1,      1.1,    1,      0.9,    0.7,    1,      1,      1,      1.05],      
        minion:         [1,     1,     2,      1,      0.4,    0.4,    1.2,    1,      1,      0.75,   1,      2,      1],      
        single:         [1.05,  1,     1,      1,      1,      1,      1,      1.05,   1,      1,      1,      1,      1],  
    sniper:             [1.35,  1,     0.25,   1,      1,      0.8,    1.1,    1.5,    1.5,    1,      1.5,    0.2,    1.15],
        rifle:          [0.8,   0.8,   1.5,    1,      0.8,    0.8,    0.9,    1,      1,      1,      1,      2,      1],     
            srifle:     [0.95,  0.85,  1.6,    1,      1,      10,     0.5,    3,      1,      13,     4,      0.01,   8], 
        assass:         [1.65,  1,     0.25,   1,      1.15,   1,      1.1,    1.18,   1.18,   1,      3,      1,      1.3],
        hunter:         [1.5,   0.7,   1,      0.95,   1,      0.9,    1,      1.1,    0.8,    1,      1.2,    1,      1.15], 
            hunter2:    [1,     1,     1,      0.9,    2,      0.5,    1.5,    1,      1,      1,      1.2,    1,      1.1], 
            preda:      [1.4,   1,     1,      0.8,    1.5,    0.9,    1.2,    0.9,    0.9,    1,      1,      1,      1],   
            snake:      [0.4,   1,     4,      1,      1.5,    0.9,    1.2,    0.2,    0.35,   1,      3,      6,      0.5],   
            sidewind:   [1.5,   2,     1,      1,      1.5,    0.9,    1,      0.15,   0.5,    1,      1,      1,      1],  
            snakeskin:  [0.6,   1,     2,      1,      0.5,    0.5,    1,      1,      0.2,    0.4,    1,      5,      1],
    mach:               [0.5,   0.8,   1.7,    1,      0.7,    0.7,    1,      1,      0.8,    1,      1,      2.5,    1],
        blaster:        [1,     1.2,   1.25,   1.1,    1.5,    1,      0.6,    0.8,    0.33,   0.6,    0.5,    1.5,    0.8], 
        chain:          [1.25,  1.33,  0.8,    1,      0.8,    1,      1.1,    1.25,   1.25,   1.1,    1.25,   0.5,    1.1], 
        mini:           [0.75,  0.6,   1,      0.8,    0.55,   0.45,   1.25,   1.33,   1,      1,      1.25,   0.5,    1.1], 
            stream:     [0.4,   0,     1,      1,      5,      3,      1,      1.5,    1,      2.5,    1,      2,      1],    
        shotgun:        [0.99,  0.4,   1,      1.5,    1,      0.4,    0.8,    1.8,    0.6,    1,      1.2,    1.2,    1], 
    flank:              [1,     1.2,   1,      1,      1.02,   0.81,   0.9,    1,      0.85,   1,      1.2,    1,      1],
        tri:            [1,     0.9,   1,      1,      0.9,    1,      1,      0.8,    0.8,    0.6,    1,      1,      1],  
            trifront:   [1,     0.2,   1,      1,      1,      1,      1,      1.3,    1.1,    1.5,    1,      1,      1],  
            thruster:   [1,     1.5,   2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
        auto: /*pure*/  [1.8,   0.75,  0.5,    0.8,    0.9,    0.6,    1.2,    1.1,    1,      0.8,    1.3,    1,      1.25],
            five:       [1.15,  1,     1,      1,      1,      1,      1,      1.05,   1.05,   1.1,    2,      1,      1],   
            autosnipe:  [1,     1,     1,      1.4,    2,      1,      1,      1,      1,      1,      1,      1,      1],   
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */ 
    pound:              [2,     1.6,   1,      1,      1,      2,      1,      0.85,   0.8,    1,      1.5,    1,      1.15], 
        destroy:        [2.2,   1.8,   0.5,    1,      2,      2,      1.2,    0.65,   0.5,    1,      2,      1,      3],
            anni:       [0.85,  1.25,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],    
            hive:       [1.5,   0.8,   1,      0.8,    0.7,    0.5,    1.1,    1,      0.6,    1,      1,      1,      1],
        arty:           [1.2,   0.7,   1,      0.9,    1,      1,      1,      1.15,   1.1,    1,      1.5,    1,      1], 
            mortar:     [1.2,   1,     1,      1,      1.1,    1,      1,      0.8,    0.8,    1,      1,      1,      1],   
            spreadmain: [0.78125, 0.25, 0.5,   1,      0.5,    1,      1,   1.5/0.78, 0.9/0.78,1,      1,      1,      1], 
            spread:     [1.5,   1,     0.25,   1,      1,      1,      1,      0.7,    0.7,    1,      1,      0.25,   1],   
            skim:       [1.33,  0.8,   0.8,    0.9,    1.35,   0.8,    2,      0.3,    0.3,    1,      1,      1,      1.1],   
    twin:               [1,     0.5,   0.9,    1,      0.9,    0.7,    1,      1,      1,      1,      1,      1.2,    1],
        bent:           [1.1,   1,     0.8,    1,      0.9,    1,      0.8,    1,      1,      1,      0.8,    0.5,    1],    
        triple:         [1.2,   0.667, 0.9,    1,      0.85,   0.85,   0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            quint:      [1.8,   0.667, 0.9,    1,      1,      0.8,      0.8,    1,      1,      1,      1.1,    0.9,    0.95], 
            dual:       [2,     1,     0.8,    1,      1.5,    1,      1,      1.3,    1.1,    1,      1,      1,      1.25], 
        double:         [1,     1,     1,      1,      1,      0.9,    1,      1,      1,      1,      1,      1,      1],
            hewn:       [1.25,  1.5,   1,      1,      0.9,    0.85,   1,      1,      0.9,    1,      1,      1,      1],
        puregunner:     [1,     0.25,  1.5,    1.2,    1.35,   0.25,   1.25,   0.8,    0.65,   1,      1.5,    1.5,    1.2],
            machgun:    [0.66,  0.8,   2,      1,      1,      0.75,   1,      1.2,    0.8,    1,      1,      2.5,    1], 
    gunner:             [1.25,  0.25,  1.5,    1.1,    1,      0.35,   1.35,   0.9,    0.8,    1,      1.5,    1.5,    1.2],
        power:          [1,     1,     0.6,    1.2,    1,      1,      1.25,   2,      1.7,    1,      2,      0.5,    1.5], 
            nail:       [0.85,  2.5,   1,      0.8,    1,      0.7,    1,      1,      1,      1,      2,      1,      1],       
        fast:           [1,     1,     1,      1,      1,      1,      1,      1.2,    1,      1,      1,      1,      1], 
    turret:             [2,     1,     1,      1,      0.8,    0.6,    0.7,    1,      1,      1,      0.1,    1,      1], 
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    battle:             [1,     1,     1,      1,      1.25,   1.15,   1,      1,      0.85,   1,      1,      1,      1.1],
        bees:           [1.3,   1,     1,      1.4,    1,      1.5,    0.5,    3,      1.5,    1,      0.25,   1,      1],   
        carrier:        [1.5,   1,     1,      1,      1,      0.8,    1,      1.3,    1.2,    1.2,    1,      1,      1],
    hexatrap:           [1.3,   1,     1.25,   1,      1,      1,      1,      0.8,    1,      0.5,    1,      1,      1],     
    block:              [1.1,   2,     0.1,    1.5,    2,      1,      1.25,   1.5,    2.5,    1.25,   1,      1,      1.25],
        construct:      [1.3,   1,     1,      0.9,    1,      1,      1,      1,      1.1,    1,      1,      1,      1], 
        boomerang:      [0.8,   1,     1,      1,      0.5,    1.2,    1,      0.75,   0.75,   1.333,  1,      1,      1], 
    over:               [1.25,  1,     1,      0.85,   0.7,    0.8,    1,      1,      0.9,    1,      2,      1,      1], 
        meta:           [1.333, 1,     1,      1,      1,      0.667,  1,      1,      1,      1,      1,      1,      1],   
        weak:           [2,     1,     1,      1,      0.6,    0.6,    0.8,    0.5,    0.7,    0.25,   0.3,    1,      1],   
        master:         [3,     1,     1,      0.7,    0.4,    0.7,    1,      1,      1,      0.1,    0.5,    1,      1], 
        sunchip:        [5,     1,     1,      1.4,    0.5,    0.4,    0.6,    1,      1,      1,      0.8,    1,      1],     
    babyfactory:        [1.5,   1,     1,      1,      1,      1,      1,      1,      1.35,   1,      1,      1,      1], 
    lowpower:           [1,     1,     2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
    halfrecoil:         [1,     0.5,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morerecoil:         [1,     1.15,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    muchmorerecoil:     [1,     1.35,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    lotsmorrecoil:      [1,     1.8,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    tonsmorrecoil:      [1,     4,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    doublereload:       [0.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],  
    morereload:         [0.75,  1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    halfreload:         [2,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    bitlessreload:      [1.2,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    lessreload:         [1.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    threequartersrof:   [1.333, 1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morespeed:          [1,     1,     1,      1,      1,      1,      1,      1.3,    1.3,    1,      1,      1,      1], 
    bitlessspeed:       [1,     1,     1,      1,      1,      1,      1,      0.93,   0.93,   1,      1,      1,      1], 
    moredamage:         [1,     1,     1,      1,      1,      1.2,    1,      1,      1,      1,      1,      1,      1],
    bitmoredamage:      [1,     1,     1,      1,      1,      1.1,    1,      1,      1,      1,      1,      1,      1],
    lessdamage:         [1,     1,     1,      1,      1,      0.7,    1,      1,      1,      1,      1,      1,      1],
    halfdamage:         [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    stronger:           [1,     1,     1,      1,      1.05,   1.05,   1,      1.1,    1,      1,      1,      1,      1],
    slow:               [1,     1,     1,      1,      1,      1,      1,      0.7,    0.7,    1,      1,      1,      1], 
    halfspeed:          [1,     1,     1,      1,      1,      1,      1,      0.5,    0.5,    1,      1,      1,      1],
    notdense:           [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      0.1,    1,      1],
    halfrange:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.5,    1,      1,      1],
    morerange:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.7,    1,      1,      1],
    fake:               [1,     1,     1,   0.00001, 0.0001,   1,      1,   0.00001,   2,      0,      1,      1,      1], 
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    op:                 [0.5,   1.3,   1,      1,      4,      4,      4,      3,      2,      1,      5,      2,      1],       
    protectorswarm:     [5,  0.000001, 1,      1,      100,    1,      1,      1,      1,      0.5,     5,      1,      10], 
    destroyDominator:   [4,     0,     1,      0.975,  8,      8,      6.25,   0.5,    1,     1,       1,      0.5,    1],
    gunnerDominator:    [0.65,  0,     1,      0.5,    1.2,    1,      1.2,    1.25,   1,     0.7,     1,      1.25,   1],
    trapperDominator:   [0.85,  0,     0.25,   1.1,    1.2,    1.2,    1.2,    0.6,    2,     0.7,     1,      0.5,    1],
    mothership:         [2,     1,     1,      1,      1.1,    1.1,    1.1,    0.6,    0.6,    15,     1,      1,      1.25],
    skimboss:           [1,     0.5,   1,      0.9,    1.2,    1.2,    1.2,    1.1,    1,     0.7,     1,      1,      1],
    summoner:           [0.1,   0.5,   1,      0.333,  1.5,    1.5,    1.5,    1,      1,     0.5,     1,      1,      1],
    bigsniper:          [2,     1.2,   1.3,   1.3,     1,      1.2,     1,      1,     1,       1,     1,      0.5,     1],
    heavymachine:       [1.2,   0.6,   1,     1.25,     1,     1.5,     2,    0.8,     1,     3.5,     1,     3.5,     1],
    flankpound:         [2,     1.6,   1,      1,      1,      2,      1,      0.85,   0.8,     1,     1.5,    1,      1.15],
    shotgun3:           [0.5,   0.4,   1,      1.5,    1,      0.4,    0.8,    1.8,    0.6,     1,     1.2,    1.2,    1],
    gatling:            [0.66,  0.8,   2,      1,      1,      0.75,   1,      1,      0.8,     1.5,   1,      3,     1],
    hexapound:          [1.5,   1.4,   1,      1,      1,      1.5,    1,      0.85,   0.8,     1,     1.5,    1,      1.15],
    rocket:             [0.5,   2,     1.5,    0.85,   0.25,   0.25,   0.25,   0.75,   1,       0.5, 1, 1.25, 1],
    rocketr:            [2, 2, 1, 1, 1.5, 0.9, 1, 0.15, 0.5, 1, 1, 1, 1],
    heatseek:           [0.1,    1.3,    1,     1,     1,      0.1,   0.1,   1,   1,     1,     1,     1,     1],
    webber:             [2,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    battle:             [1, 1, 1, 1, 1.25, 1.15, 1, 1, 0.85, 1, 1, 1, 1.1],
    sheild:             [0.2, 0, 1, 0.7, 1, 1, 1, 0.01, 1, 0.01, 1, 1, 1],
    flare:              [0.5,   1.3,   1.5,   0.85,   0.25,  0.25,   0.25,    0.75,    1,     0.5,    1,     1.25,      1],
    flarer:             [2, 1.3, 1, 1, 1.5, 0.9, 1, 0.15, 0.5, 1, 1, 1, 1],
    explosion:          [18,    1.4,   0.1,    1,      1,      0.75,   1,      4.5,    1,      1,      1,      1,     1], 
    lazer:              [0.1,    1.4,   0.1,    2,      1,      0.1,   1,      6,    1,      0.60,      1,      1,     1], 
    heatseekmach:       [0.5,   2, 1.5,   0.85, 0.25, 0.25, 0.25, 0.75, 1, 0.5, 1, 1.25, 1],
    nade:               [4.5,   5,     1,       1.5,    1,      1,     5,      1,      1,      1.1,    5,      0.01,      2],
    frag:               [1.35,  2,     0.25,    1,      20,     1.8,    0.8,    0.8,    1.5,    20,     1.5,    0.2,    1.15],
    trpfrag:            [1.35,  2,     0.25,    1,      20,     1.8,    0.8,    0.8,    1.5,    60,     1.5,    0.2,    1.15],
    bigfrag:            [1.35,  2,     0.25,    5,      20,     1.8,    0.8,    0,    1.5,    10,     1.5,    0.2,    1.15],
};

const dfltskl = 9;

// NAMES
const statnames = {
    smasher: 1,
    drone: 2,
    necro: 3,
    swarm: 4,
    trap: 5,
    generic: 6,
};
const gunCalcNames = {
    default: 0,
    bullet: 1,
    drone: 2,
    swarm: 3,
    fixedReload: 4,
    thruster: 5,
    sustained: 6,
    necro: 7,
    trap: 8,
};

// ENTITY DEFINITIONS
exports.genericEntity = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    COLOR: 16,  
    INVISIBLE: [0, 0],
    ALPHA: 1,
    WATER_PROOF: false,
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],    
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 0,
        HEALTH: 0,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,
        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,        
        HETERO: 2,
    },    
    FOOD: {
        LEVEL: -1,
    },
};

// FOOD
exports.food = {
    TYPE: 'food',
    DAMAGE_CLASS: 1,
    CONTROLLERS: ['moveInCircles'],
    HITS_OWN_TYPE: 'repel',
    MOTION_TYPE: 'drift',
    FACING_TYPE: 'turnWithSpeed',
    VARIES_IN_SIZE: true,
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 1,
    },
    DAMAGE_EFFECTS: false,
    RATEFFECTS: false,
    HEALTH_WITH_LEVEL: false,
};

const basePolygonDamage = 1;
const basePolygonHealth = 2;
exports.hugePentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5,
    },
    LABEL: 'Alpha Pentagon',
    VALUE: 15000,
    SHAPE: -5,
    SIZE: 58,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.bigPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 4,
    },
    LABEL: 'Beta Pentagon',
    VALUE: 2500,
    SHAPE: 5,
    SIZE: 30,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 50 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        SHIELD: 20 * basePolygonHealth,
        REGEN: 0.2,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.pentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 3,
    },
    LABEL: 'Pentagon',
    VALUE: 400,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.triangle = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 2,
    },
    LABEL: 'Triangle',
    VALUE: 120,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 2,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.square = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 1,
    },
    LABEL: 'Square',
    VALUE: 30,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.egg = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 0,
    },
    LABEL: 'Egg',
    VALUE: 10,
    SHAPE: 0,
    SIZE: 5,
    COLOR: 6,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 0.0011,
        PUSHABILITY: 0,
    },
    DRAW_HEALTH: false,
};

exports.greenpentagon = {
    PARENT: [exports.food],
    LABEL: 'Pentagon',
    VALUE: 30000,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 1,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 200,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.greentriangle = {
    PARENT: [exports.food],
    LABEL: 'Triangle',
    VALUE: 7000,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 1,
    BODY: {
        DAMAGE: 1,
        DENSITY: 6,
        HEALTH: 60,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.greensquare = {
    PARENT: [exports.food],
    LABEL: 'Square',
    VALUE: 2000,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 1,
    BODY: {
        DAMAGE: 0.5,
        DENSITY: 4,
        HEALTH: 20,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};

exports.gem = {
    PARENT: [exports.food],
    LABEL: 'Gem',
    VALUE: 2000,
    SHAPE: 6,
    SIZE: 5,
    COLOR: 0,
    BODY: {
        DAMAGE: basePolygonDamage/4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.obstacle = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Rock',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: 4,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 16,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
    exports.babyObstacle = {
        PARENT: [exports.obstacle],
        SIZE: 25,
        SHAPE: 4,
        LABEL: "Gravel",
    };
    exports.platinum  = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'platinum',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: 4,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 25,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
    exports.lapis = {
        PARENT: [exports.platinum],
        SIZE: 25,
        SHAPE: 4,
        LABEL: "lapis",
    }; 
exports.tree = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Tree',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: 4,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 23,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
    exports.bush = {
        PARENT: [exports.tree],
        SIZE: 25,
        SHAPE: 4,
        LABEL: "Bush",
    }; 
// WEAPONS
const wepHealthFactor = 0.5;
const wepDamageFactor = 1.5;
exports.bullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true, 
    SHAPE: 4,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        SHAPE: 4,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.bullet2 = {
    LABEL: 'Bullet',
    TYPE: 'wall', 
    ACCEPTS_SCORE: false, 
    PERSISTS_AFTER_DEATH: true, 
    SHAPE: 4,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        SHAPE: 4,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
    exports.casing = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
    };

exports.swarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    DIE_AT_RANGE: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
}
    exports.bee = {
        PARENT: [exports.swarm],
        PERSISTS_AFTER_DEATH: true, 
        SHAPE: -4, 
        LABEL: 'Drone',
        HITS_OWN_TYPE: 'hardWithBuffer',
    };
    exports.autoswarm = {
        PARENT: [exports.swarm],
        AI: { FARMER: true, },
        INDEPENDENT: true,
    };

exports.trap = {
    LABEL: 'Thrown Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true,
    SHAPE: -3, 
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
};
    exports.star = {
        PARENT: [exports.trap],
        LABEL: 'Star',
        TYPE: 'swarm',
        SHAPE: 1,
        HITS_OWN_TYPE: 'never',
        MOTION_TYPE: 'swarm',
        FACING_TYPE: 'turnWithSpeed',

    }
    exports.block = {
        LABEL: 'Set Trap',
        PARENT: [exports.trap],
        SHAPE: -4,
        MOTION_TYPE: 'motor',    
        CONTROLLERS: ['goToMasterTarget'],
        BODY: {
            SPEED: 1,
            DENSITY: 5,
        },
    };

    exports.boomerang = {
        LABEL: 'Boomerang',
        PARENT: [exports.trap],
        CONTROLLERS: ['boomerang'],
        MOTION_TYPE: 'motor',  
        HITS_OWN_TYPE: 'never',
        SHAPE: -5,
        BODY: {
            SPEED: 1.25,
            RANGE: 120,
        },
    };

exports.drone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};

    exports.sunchip = {
        PARENT: [exports.drone],
        SHAPE: 4,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
    exports.autosunchip = {
        PARENT: [exports.sunchip],
        AI: {
            BLIND: true,
            FARMER: true,
        },
        INDEPENDENT: true,
    };
    exports.gunchip = {
        PARENT: [exports.drone],
        SHAPE: -2,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };

exports.missile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     -2,     130,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,      2,     230,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, }, 
    ],
};
exports.boosterspawn = {
    PARENT: [exports.bullet],
    SHAPE: 0,
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.lowpower, g.muchmorerecoil, g.morespeed,

                g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
        },
    }, {
        POSITION: [13, 8, 1, 0, 0, 135, 0.6, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.lowpower, g.muchmorerecoil, g.morespeed,

                g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 8, 1, 0, 0, 225, 0.6, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.lowpower, g.muchmorerecoil, g.morespeed,

                g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 8, 1, 0, 0, 145, 0.1, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.lowpower, g.muchmorerecoil, g.morespeed,

                g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 8, 1, 0, 0, 215, 0.1, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.lowpower, g.muchmorerecoil, g.morespeed,

                g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
    exports.hypermissile = {
        PARENT: [exports.missile],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     6,      1,      0,     -2,     150,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     210,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {        
            POSITION: [  14,     6,      1,      0,     -2,      90,    0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     270,    0.5,  ],  
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.snake = {
        PARENT: [exports.bullet],
        LABEL: 'Snake',
        INDEPENDENT: true,
        BODY: {
            RANGE: 120,
        },  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,    12,     1.4,     8,      0,     180,    0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake, g.snakeskin,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  10,    12,     0.8,     8,      0,     180,   0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    NEGATIVE_RECOIL: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };

    exports.hive = {
        PARENT: [exports.bullet],
        LABEL: 'Hive',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      108,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      180,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      252,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      324,    0.6,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      36,     0.8,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, 
        ],
    };

// TANK CLASSES
const base = {
    ACCEL: 1.6,
    SPEED: 5.25,
    HEALTH: 20,
    DAMAGE: 3,
    RESIST: 1,
    PENETRATION: 1.05,
    SHIELD: 8,
    REGEN: 0.025,
    FOV: 1,
    DENSITY: 0.5,
};
exports.genericTank = {
    LABEL: 'Unknown Class',
    TYPE: 'tank', 
    DAMAGE_CLASS: 2,
    DANGER: 5,
    SHAPE: 4,
    INVISIBLE: [0, 0],
    ALPHA: 1,
    WATER_PROOF: false,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    SIZE: 12,
    MAX_CHILDREN: 0,   
    DAMAGE_EFFECTS: false,
    BODY: { // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH, 
        DAMAGE: base.DAMAGE, 
        PENETRATION: base.PENETRATION, 
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS:[],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
};
let gun = { };

exports.autoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
                TYPE: exports.bullet,
            }, },
    ],
};
    exports.machineAutoTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,    11,     1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.mach, g.slow]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.autoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     6,      1,      0,      5,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {
            POSITION: [  20,     6,      1,      0,     -5,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };
    exports.oldAutoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     7,      1,      0,    -5.75,    0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {            
            POSITION: [  20,     7,      1,      0,     5.75,    0,     0.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };
exports.odTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    SHAPE: 4,
    //CONTROLLERS: ['nearestDifferentMaster'],
};
exports.auto3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                TYPE: exports.bullet,
            }, }
    ],
};
    exports.auto5gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    11,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.five]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.heavy3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
             FOV: 2,
            SPEED: 0.9,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.masterGun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 16,
        MAX_CHILDREN: 6,
        AI: {
            NO_LEAD: true,
            SKYNET: true,
            FULL_VIEW: true,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   8,     14,    1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.master]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.sniper3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 5,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  27,     9,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.auto, g.assass, g.autosnipe]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [   5,     9,     -1.5,    8,      0,      0,      0,   ], 
            },
        ],
    };

    exports.autorailgun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
         POSITION: [  1,     8,      1,      10,     0,      0,      0, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.bitlessspeed, g.bitlessspeed, g.bitlessspeed, g.bitlessspeed, g.bitlessspeed, g.halfrange]),
                    TYPE: exports.bullet,
                }, }, { 
                POSITION: [  1,     8,      1,      15,     0,      0,      0, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.halfrange]),
                    TYPE: exports.bullet,
                }, }, { 
                POSITION: [  1,     8,      1,      20,     0,      0,      0, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morespeed, g.halfrange]),
                    TYPE: exports.bullet,
                }, }, { 
                POSITION: [  1,     8,      1,      25,     0,      0,      0, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morespeed, g.morespeed, g.halfrange]),
                    TYPE: exports.bullet,
                }, }, { 
                POSITION: [  27,    2,      1,      0,      4,      0,      0, ],
                }, { 
                POSITION: [  27,    2,      1,      0,      -4,     0,      0, ],
            },
        ],
    };
    exports.bansheegun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  26,    10,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.lessreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.auto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     4,      1,      0,    -3.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     3.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.bigauto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     5,      1,      0,    -4.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
 exports.bigauto3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     5,      1,      0,      0,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };


exports.tritrapgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    16,      1,      0,      0,      0,      0,   ], 
        }, {
        POSITION: [   2,    16,     1.1,     20,     0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
                TYPE: exports.block,
            }, },
    ],
};
exports.smasherBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true,
};
exports.landmineBody = {
    LABEL: '',
    CONTROLLERS: ['fastspin'], 
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true,
};
exports.spikeBody = {
    LABEL: '',
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: -4,
    INDEPENDENT: true,
};
    exports.spikeBody1 = {
        LABEL: '',
        CONTROLLERS: ['fastspin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
    exports.spikeBody2 = {
        LABEL: '',
        CONTROLLERS: ['reversespin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
exports.megasmashBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: -8,
    INDEPENDENT: true,
};
exports.megamineBody = {
    LABEL: '',
    CONTROLLERS: ['fastspin'], 
    COLOR: 9,
    SHAPE: -8,
    INDEPENDENT: true,
};
exports.dominationBody = {
    LABEL: '',
    CONTROLLERS: ['dontTurn'], 
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true,
};
    exports.baseSwarmTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        COLOR: 16,
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        AI: {
            NO_LEAD: true,
            LIKES_SHAPES: true,
        },
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   5,    4.5,    0.6,     7,      2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,          
                }, }, {
            POSITION: [   5,    4.5,    0.6,     7,     -2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   5,    4.5,    0.6,    7.5,     0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: [exports.swarm, { INDEPENDENT: true, AI: { LIKES_SHAPES: true, }, }, ],
                    STAT_CALCULATOR: gunCalcNames.swarm,  
            }, }
        ],
    };
    exports.baseGunTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        BODY: {
            FOV: 5,
        },
        ACCEPTS_SCORE: false,
        CONTROLLERS: ['nearestDifferentMaster'], 
        INDEPENDENT: true,
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  12,    12,     1,       6,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [  11,    13,     1,       6,      0,      0,     0.1,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [   7,    13,    -1.3,     6,      0,      0,      0,   ],
                }
        ],
    };
        exports.baseProtector = {
            PARENT: [exports.genericTank],
            LABEL: 'Base',
            SIZE: 64,
            DAMAGE_CLASS: 0,
            ACCEPTS_SCORE: false,
            SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
            BODY: { // def
                SPEED: 0,
                HEALTH: 10000, 
                DAMAGE: 10, 
                PENETRATION: 0.25, 
                SHIELD: 1000,
                REGEN: 100,
                FOV: 1,
                PUSHABILITY: 0,
                HETERO: 0,
            },
            //CONTROLLERS: ['nearestDifferentMaster'],
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: exports.dominationBody,
                        }, {
                POSITION: [  12,     7,      0,      45,     100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     135,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     225,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     315,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        },
            ],
            GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     315,     0,   ], }, {
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     315,     0,   ], }, 
            ],
        };

exports.minion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.pillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    11,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.pillbox = {
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pillboxTurret,
        }
    ]
};
exports.skimturret = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 2,
    },
    COLOR: 2,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    LABEL: '',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                TYPE: exports.hypermissile,
            }, }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
            },
    ],
};

//Grenades

    exports.nade2 = {
        PARENT: [exports.bullet],
        LABEL: 'Grenade (2)',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     8,      0,      0,      0,   ], 
            }, {
            POSITION: [   3,    10,      1,     12.5,   1.5,     0,      0,   ], 
            }, {
            POSITION: [   1,    10,      1,      0,      0,      90,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     270,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, 
        ],
    };

    exports.nade3 = {
        PARENT: [exports.bullet],
        LABEL: 'Grenade (3)',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     8,      0,      0,      0,   ], 
            }, {
            POSITION: [   3,    10,      1,     12.5,   1.5,     0,      0,   ], 
            }, {
            POSITION: [   1,    10,      1,      0,      0,      60,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     180,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     300,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, 
        ],
    };

    exports.nade4 = {
        PARENT: [exports.bullet],
        LABEL: 'Grenade (4)',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     8,      0,      0,      0,   ], 
            }, {
            POSITION: [   3,    10,      1,     12.5,   1.5,     0,      0,   ], 
            }, {
            POSITION: [   1,    10,      1,      0,      0,      90,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     270,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,      0,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     180,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, 
        ],
    };
exports.nade4v2 = {      
        PARENT: [exports.bullet],
        LABEL: 'Grenade (4)',
        BODY: {
            RANGE: 5,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,  
        MOTION_TYPE: 'motor',     
        CONTROLLERS: ['alwaysFire', 'goToMasterTarget'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     8,      0,      0,      0,   ], 
            }, {
            POSITION: [   3,    10,      1,     12.5,   1.5,     0,      0,   ], 
            }, {
            POSITION: [   1,    10,      1,      0,      0,      90,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     270,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,      0,      6.5,   ],  
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     180,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, 
        ],
    };
exports.areaeffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true, 
    SHAPE: 0,
    BODY: {
        PENETRATION: 1,
        SPEED: 0,
        RANGE: 10,
        SHAPE: 0,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.nadetest = {  
        PARENT: [exports.bullet],
        LABEL: 'Grenade test',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 4,
        INDEPENDENT: true, 
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   1,    15,      1,      0,      0,      0,      2.5, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.bigfrag]),  
                    TYPE: [exports.areaeffect],
            }, }, 
        ],
    };
exports.nadethrower3 = {
            PARENT: [exports.genericTank],
            DANGER: 8,
            INVISIBLE: [0.2, 0],
            LABEL: 'Mine Shooter', 
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    8.5,     1.2,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.nade]), 
                        TYPE: exports.nadetest,
                    }, }, {
                POSITION: [   5,    9.5,    -1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };
    exports.nade8 = {
        PARENT: [exports.bullet],
        LABEL: 'Grenade (8)',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     8,      0,      0,      0,   ], 
            }, {
            POSITION: [   3,    10,      1,     12.5,   1.5,     0,      0,   ], 
            }, {
            POSITION: [   1,    10,      1,      0,      0,      90,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     270,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,      0,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     180,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,      45,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     225,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     315,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     135,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, 
        ],
    };

    //Trap nades

    exports.trpnade2 = {
        PARENT: [exports.bullet],
        LABEL: 'Grenade (trp2)',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     8,      0,      0,      0,   ], 
            }, {
            POSITION: [   3,    10,      1,     12.5,   1.5,     0,      0,   ], 
            }, {
            POSITION: [   1,    10,      1,      0,      0,      90,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     270,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, 
        ],
    };

    exports.trpnade3 = {
        PARENT: [exports.bullet],
        LABEL: 'Grenade (trp3)',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     8,      0,      0,      0,   ], 
            }, {
            POSITION: [   3,    10,      1,     12.5,   1.5,     0,      0,   ], 
            }, {
            POSITION: [   1,    10,      1,      0,      0,      60,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     180,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     300,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, 
        ],
    };

    exports.trpnade4 = {
        PARENT: [exports.bullet],
        LABEL: 'Grenade (trp4)',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     8,      0,      0,      0,   ], 
            }, {
            POSITION: [   3,    10,      1,     12.5,   1.5,     0,      0,   ], 
            }, {
            POSITION: [   1,    10,      1,      0,      0,      90,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     270,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,      0,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     180,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, 
        ],
    };

    exports.trpnade8 = {
        PARENT: [exports.bullet],
        LABEL: 'Grenade (trp8)',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     8,      0,      0,      0,   ], 
            }, {
            POSITION: [   3,    10,      1,     12.5,   1.5,     0,      0,   ], 
            }, {
            POSITION: [   1,    10,      1,      0,      0,      90,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     270,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,      0,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     180,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,      45,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     225,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     315,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     135,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, 
        ],
    };

function makeAuto(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurret, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,      0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}

function makeHybrid(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type));
    let spawner = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   7,     12,    1.2,     8,      0,     180,     0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true, }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,    
            MAX_CHILDREN: 3,
        }, };
    if (type.TURRETS != null) { output.TURRETS = type.TURRETS; }
    if (type.GUNS == null) { output.GUNS = [spawner]; }
    else { output.GUNS = [...type.GUNS, spawner]; }
    if (name == -1) { output.LABEL = 'Hybrid ' + type.LABEL; } else { output.LABEL = name; }
    return output;
}
exports.oddrone = makeAuto(exports.drone, 'Auto-Drone', {type: exports.heavy3gun, size: 15,});

exports.basic = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    LEVEL: 60,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
           exports.testbed = {
            PARENT: [exports.genericTank],
            RESET_UPGRADES: true,
            LABEL: 'DEV',
            SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            LEVEL: 1,
            BODY: { // def
                SHIELD: 10000,
                REGEN: 100,
                HEALTH: 10000,
                DAMAGE: 10,
                DENSITY: 40, //20,
                SPEED: 10,
                FOV: 5, //15,
            },
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };
exports.starshoot = {
    PARENT: [exports.genericTank],
    LABEL: 'Star-Shooter',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,    10,     -1.5,    0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.star,
        }, }, 
    ],
};
            exports.single = {
                PARENT: [exports.genericTank],
                LABEL: 'Single',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };


            exports.autosin = makeAuto(exports.single , 'Auto-Single');
            exports.hybirdsin = makeHybrid(exports.single, 'Blaster');
            exports.gsingle = {
                PARENT: [exports.genericTank],
                LABEL: 'Double',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ], 
                        }, {
                    POSITION: [  19,     8,      1,      0,      0,      180,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      180,      0,   ],                            
                    }
                ],
            };  


        let smshskl = 12; //13;
        exports.smash = {
            PARENT: [exports.genericTank],
            LABEL: 'Smasher',
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
            exports.megasmash = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega-Smasher',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed * 1.05,
                    FOV: base.FOV * 1.1,
                    DENSITY: base.DENSITY * 4,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  24,     0,      0,      0,     360,  0,], 
                    TYPE: exports.megasmashBody,
                }],
            };
            exports.megamine = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega-Mine',
                INVISIBLE: [0.065, 0.01],
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 1.075,
                    FOV: base.FOV * 1.075,
                    DENSITY: base.DENSITY * 3,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  24,     0,      0,      0,     360,  0,], 
                    TYPE: exports.megasmashBody,
                }, {
                    POSITION: [  24,     0,      0,      30,     360,  0,], 
                    TYPE: exports.megamineBody,
                }],
            };
            exports.landmine = {
                PARENT: [exports.genericTank],
                LABEL: 'Landmine',
                INVISIBLE: [0.06, 0.01],
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 1.1,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 2,
                },
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  21.5,   0,      0,      0,     360,  0,],
                    TYPE: exports.smasherBody,
                }, { 
                    POSITION: [  21.5,   0,      0,      30,     360,  0,],
                    TYPE: exports.landmineBody,
                }],
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
            };
            exports.spike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed*0.9,
                    DAMAGE: base.DAMAGE * 1.1,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 2,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     120,    360,  0,], 
                    TYPE: exports.spikeBody,
                    }, {
                    POSITION: [ 20.5,    0,      0,     240,    360,  0,], 
                    TYPE: exports.spikeBody,
                }],
            };     
            exports.weirdspike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    DAMAGE: base.DAMAGE * 1.15,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 1.5,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody1,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     180,    360,  0,], 
                    TYPE: exports.spikeBody2,
                }],
            };       
            exports.autosmash = makeAuto(exports.smash, 'Auto-Smasher', { type: exports.autoSmasherTurret, size: 11, });
            exports.autosmash.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl,];

    exports.twin = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.shotgun1 = {
        PARENT: [exports.genericTank],
        LABEL: 'Shot Gun',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,     5,      1,      0,     3.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,     5,      1,      0,    -3.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, },
        ],
    };

    exports.twinangle = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin Tri-angle',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  18,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
               }, }, {
           POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, },
        ],
    };
        exports.gunner = {
            PARENT: [exports.genericTank],
            LABEL: 'Gunner',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };

        exports.gunnerflank = {
            PARENT: [exports.genericTank],
            LABEL: 'Double Gunner',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                   }, }, {
                        TYPE: exports.bullet,
                POSITION: [  12,    3.5,     1,      0,     7.25,    180,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    180,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    180,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };

      exports.battery = {
        PARENT: [exports.genericTank],
            LABEL: 'Battery',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,    3.5,     1,      0,      0,      0,     0.90, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                  },  },
            ],
        };

            exports.machinegunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Machine Gunner',
                DANGER: 6,
                BODY: {
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     3,     4.0,    -3,      5,      0,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      0,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     0,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  14,     3,     4.0,     3,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, 
                ]
            };
            exports.autogunner = makeAuto(exports.gunner);            
            exports.nailgun = {
                PARENT: [exports.genericTank],
                LABEL: 'Nailgun',
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     2,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],
                        },
                ],
            };

        exports.double = {
            PARENT: [exports.genericTank],
            LABEL: 'Double Twin',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.tripletwin = {
                PARENT: [exports.genericTank],
                LABEL: 'Triple Twin',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    120,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    240,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.autodouble = makeAuto(exports.double, 'Auto-Double');
            exports.split = {
                PARENT: [exports.genericTank],
                LABEL: 'Hewn Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     5.5,     25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,    -5.5,    -25,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };

        exports.bent = {
            PARENT: [exports.genericTank],
            LABEL: 'Triple Shot',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.bentdouble = {
                PARENT: [exports.genericTank],
                LABEL: 'Bent Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     -1,     -25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,      25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -1,     155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,    -155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.penta = {
                PARENT: [exports.genericTank],
                LABEL: 'Penta Shot',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.85,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     8,      1,      0,     -3,    -30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      3,     30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -2,    -15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      2,     15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.benthybrid = makeHybrid(exports.bent, 'Bent Hybrid');

        exports.triple = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
            },
            LABEL: 'Triplet',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,      1,      0,      5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    10,      1,      0,     -5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    10,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };

  exports.tripleangle = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
            },
            LABEL: 'Triplet-Triangle',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,      1,      0,      5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    10,      1,      0,     -5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    10,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, {
                 POSITION: [  18,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, 
            ],
        };
            exports.quint = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'Quintuplet',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,    10,      1,      0,     -5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    10,      1,      0,      5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,    10,      1,      0,     -3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  19,    10,      1,      0,      3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };        
            exports.dual = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    ACCEL: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'dual',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     7,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  18,     7,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  16,    8.5,     1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  16,    8.5,     1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };

    exports.sniper = {
        PARENT: [exports.genericTank],
        LABEL: 'Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, },
        ],
    };
    exports.assult = {
        PARENT: [exports.genericTank],
        LABEL: 'Assult',
        INVISIBLE: [0.08, 0.04],
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    8.5,     1.5,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.morereload, g.morereload, g.morerange]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.snipertriple = {
        PARENT: [exports.genericTank],
        LABEL: 'Triple Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, }, {
              POSITION: [  24,    8.5,     1,      0,      0,      120,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, }, {
              POSITION: [  24,    8.5,     1,      0,      0,      240,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, },
        ],
    };

 exports.twinsnipe = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,    -5.5,     0,    0.675, ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  24,    8.5,     1,      0,      5.5,     0,      0,    ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
           }, },
        ],
    };

   exports.bigsniper = {
        PARENT: [exports.genericTank],
        DANGER: 7,
        LABEL: 'Howitzer',
        BODY:{
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.3,
            SPEED: base.SPEED * 0.95
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  27,    9.5,    1.5,     0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.sniper, g.lessreload ]),
                TYPE: exports.bullet,
            }, },
        ],
    };

      exports.rifle = {
                PARENT: [exports.genericTank],
                LABEL: 'Rifle',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };

      exports.srifle = {
                PARENT: [exports.genericTank],
                LABEL: 'Sniper Rifle',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5, 
                    FOV: base.FOV * 1.5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [   8,    10.5,    -1.6,   5,      0,      0,      0,   ],
                        }, {
                    POSITION: [  26,     5.5,    1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.srifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };

       exports.rifle2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Sniper Rifle',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                  POSITION: [  25,    10.5,    1,      0,      0,      0,      0,   ]
                } , {
                 POSITION: [   8,    10.5,    -1.6,    5,      0,      0,      0,   ],
                }, {
                 POSITION: [  28,     7,      1,      0,      0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.rifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
 exports.unnamed = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
            FOV: base.FOV * 1.225,
        },
        LABEL: 'Far N Close',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
                ALT_FIRE: true,
            }, },
        ],
    };
        exports.hybirdrif = makeHybrid(exports.rifle, 'tomahawk');
        exports.assassin = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Assassin',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };

        exports.nadethrower2 = {
            PARENT: [exports.genericTank],
            DANGER: 8,
            LABEL: 'Linger-bomber',
            BODY: {
                ACCELERATION: base.ACCEL * 0.85,
                SPEED: base.SPEED * 0.75, 
                FOV: base.FOV * 1.05,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  23,    8.5,     1.2,    0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.nade]), 
                        TYPE: exports.nade4v2,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };
exports.nadethrower = {
            PARENT: [exports.genericTank],
            DANGER: 8,
            LABEL: 'Semi-bomber',
            BODY: {
                ACCELERATION: base.ACCEL * 0.85,
                SPEED: base.SPEED * 0.75, 
                FOV: base.FOV * 1.05,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,    8.5,     1.2,    0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.nade]), 
                        TYPE: exports.nade4,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };

            exports.hybridassa = makeHybrid(exports.assassin, 'Hardscope');
            exports.ranger = {
                PARENT: [exports.genericTank],
                LABEL: 'Ranger',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  32,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                    },
                ],
            };
            exports.autoass = makeAuto(exports.assassin, "Auto-Assassin");

        exports.hunter = {
            PARENT: [exports.genericTank],
            LABEL: 'Hunter',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    12,      1,      0,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };

 exports.hunter4 = {
            PARENT: [exports.genericTank],
            LABEL: 'Heavy Hunter',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  24,     11,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.pound, g.lessreload]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    13,      1,      0,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.pound, g.lessreload]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.preda = {
                PARENT: [exports.genericTank],
                LABEL: 'Predator',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,    12,      1,      0,      0,      0,     0.15, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  18,    16,      1,      0,      0,      0,     0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.poach = makeHybrid(exports.hunter, 'Poacher');
            exports.sidewind = {
                PARENT: [exports.genericTank],
                LABEL: 'Sidewinder',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    11,    -0.5,    14,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  21,    12,    -1.1,     0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind]),
                            TYPE: exports.snake,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };

    exports.director = {
        PARENT: [exports.genericTank],
        LABEL: 'Director',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.manager = {
        PARENT: [exports.genericTank],
        LABEL: 'Manager',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
                INVISIBLE: [0.08, 0.03],
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
            exports.master = {
                PARENT: [exports.genericTank],
                LABEL: '',  
                STAT_NAMES: statnames.drone,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.15,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  16,     1,      0,      0,      0, 0], 
                        TYPE: exports.masterGun,
                            }, {
                    POSITION: [  16,     1,      0,     120,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            }, {
                    POSITION: [  16,     1,      0,     240,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            },
                ],
            };

        exports.overseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Overseer',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            MAX_CHILDREN: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        };
            exports.overhunt = {
            PARENT: [exports.genericTank],
            LABEL: 'Overhunt',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            MAX_CHILDREN: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   10,     12,    1.2,     8,      0,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     18,    1.2,     8,      0,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.pound, g.lessreload]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        };
            exports.overdrive = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Overdrive',
                DANGER: 6,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 1.0,
                    FOV: base.FOV * 1.3,
                },
                MAX_CHILDREN: 4,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.oddrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.oddrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        }, 'Overdrive', {type: exports.odTurret, size: 11});
            exports.overworker = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Overdrive',
                DANGER: 6,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 1.1,
                    FOV: base.FOV * 1.4,
                },
                MAX_CHILDREN: 6,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.oddrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.oddrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.oddrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.oddrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
        }, 'Overworker', {type: exports.odTurret, size: 11});
            exports.overlord = {
                PARENT: [exports.genericTank],
                LABEL: 'Overlord',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
            };
   
            exports.overtrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Overtrapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.banshee = {
                PARENT: [exports.genericTank],
                LABEL: 'Banshee',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     8,      0,      0,      80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     120,     80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     240,     80, 0], 
                        TYPE: exports.bansheegun,
                            },
                ],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, 
                    ]
            };
            exports.autoover = makeAuto(exports.overseer, "Auto-seer");
            exports.overgunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Overgunner',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        },
                ],
            };
        
        function makeSwarmSpawner(guntype) {
            return {
                PARENT: [exports.genericTank],
                LABEL: '',
                BODY: {
                    FOV: 2,
                },
                CONTROLLERS: ['nearestDifferentMaster'], 
                COLOR: 16,
                AI: {
                    NO_LEAD: true,
                    SKYNET: true,
                    FULL_VIEW: true,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     15,    0.6,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: guntype,
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }
                ],
            };
        }
        exports.cruiserGun = makeSwarmSpawner(combineStats([g.swarm]));
        exports.cruiser = {
            PARENT: [exports.genericTank],
            LABEL: 'Cruiser',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,    7.5,    0.6,     7,      4,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
exports.sailor = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Sailor',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [7,    7.5,    0.6,     5.5,      4,      25,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     5.5,     -4,      -25,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
            POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                },
            ],
        };
exports.gunnshi = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Gunner ship',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [7,    7.5,    0.6,     5.5,      4,      25,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     5.5,     -4,      -25,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
               POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
                }, },
            ],
        };
exports.sailor2 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Pirate',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [7,    7.5,    0.6,     5.5,      4,      25,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     5.5,     -4,      -25,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
             POSITION: [  23,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  23,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                },
            ],
        };
exports.sailor4 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Spead Ship',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [7,    7.5,    0.6,     5.5,      4,      25,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     5.5,     -4,      -25,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
             POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, {
               POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        };
exports.sailorxl = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Warrior',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                     POSITION: [7,    7.5,    0.6,     5.5,      4,      45,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     5.5,     -4,      -45,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                    POSITION: [7,    7.5,    0.6,     5.5,      4,      25,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     5.5,     -4,      -25,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
            POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                },
            ],
        };
exports.sailortrap = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Sailor Trapper',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [7,    7.5,    0.6,     5.5,      4,      25,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     5.5,     -4,      -25,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
             POSITION: [  13,     4,      1,      0,      -4,      0,     0,   ],
                    }, {
                POSITION: [   2.5,     4,     1.7,    13,      -4,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
            POSITION: [  13,     4,      1,      0,      4,      0,     0,   ],
                    }, {
                POSITION: [   2.5,     4,     1.7,    13,      4,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                }, },
            ],
        };
exports.sailorpunt = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Gunner Sailor',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [7,    7.5,    0.6,     5.5,      4,      25,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     5.5,     -4,      -25,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
             POSITION: [  18,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  18,     2.5,      1,      0,    -3,     0,     0.15,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  16,     2.5,      1,      0,     3,     0,      0.3,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  16,     2.5,      1,      0,    -3,     0,     0.45,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  14,     2.5,      1,      0,     3,     0,      0.6,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  14,     2.5,      1,      0,    -3,     0,     0.75,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0.9,   ],
                },
            ],
        };

            exports.battleship = {
                PARENT: [exports.genericTank],
                LABEL: 'Battleship',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      4,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     90,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',        
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      4,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',         
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, },
                ],
            };

 exports.invader = {
                PARENT: [exports.genericTank],
                LABEL: 'Invader',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   8,    8.5,    0.6,     7,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',               
                        }, }, {
                    POSITION: [   8,    8.5,    0.6,     7,      0,     -90,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',        
                        }, }, {
                    POSITION: [   8,    8.5,    0.6,     7,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',         
                        }, }, {
                    POSITION: [   8,    8.5,    0.6,     7,      0,      0,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous' ,              
                        }, },
                ],
            };

            exports.carrier = {
                PARENT: [exports.genericTank],
                LABEL: 'Carrier',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      2,      40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -2,     -40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }
                ],
            };
            exports.autocruiser = makeAuto(exports.cruiser, "autocrusier");
            exports.fortress = {
                PARENT: [exports.genericTank],
                LABEL: 'Fortress', //'Palisade',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     120,    1/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     240,    2/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [  14,     9,      1,      0,      0,     60,      0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     60,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     300,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
   exports.fortress2 = {
                PARENT: [exports.genericTank],
                LABEL: 'WarShip', //'Palisade',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                      POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
                        }, }, {
                     POSITION: [  18,     8,      1,      0,      0,      120,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
                        }, }, {
                          POSITION: [  18,     8,      1,      0,      0,      240,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  14,     9,      1,      0,      0,     60,      0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     60,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     300,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

        exports.underseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Underseer',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            SHAPE: 4,
            MAX_CHILDREN: 14,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   5,     12,    1.2,     8,      0,     270,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
                ],
        };
            exports.necromancer = {
                PARENT: [exports.genericTank],
                LABEL: 'Necromancer',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 4,
                FACING_TYPE: 'autospin',
                MAX_CHILDREN: 14,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.morereload, g.morereload]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.morereload, g.morereload]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.morereload, g.morereload]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard',
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.morereload, g.morereload]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard', 
                        }, },
                    ],
            };



        exports.lilfact = {
            PARENT: [exports.genericTank],
            LABEL: 'Spawner',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  4.5,    10,      1,     10.5,    0,      0,      0,   ], 
                }, {
                POSITION: [   1,     12,      1,      15,     0,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 4,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.minion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                    POSITION: [  3.5,    12,      1,      8,      0,      0,      0,   ], 
                }
            ],
        };   
            exports.autolil = makeAuto(exports.lilfact , "Auto-Spawner")
            exports.factory = {
                PARENT: [exports.genericTank],
                LABEL: 'Factory',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: 1.1,
                },
                MAX_CHILDREN: 6,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.minion,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, }, {                        
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
                    }
                ],
            };
    exports.machine = {
        PARENT: [exports.genericTank],
        LABEL: 'Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };
    
    exports.automachine = makeAuto(exports.machine , "Auto-Machine Gun")

exports.heavymachine = {
        PARENT: [exports.genericTank],
        LABEL: 'Heavy-MachineGun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     12,     1.7,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.pound, g.heavymachine]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.heavymachine3 = {
        PARENT: [exports.genericTank],
        LABEL: '',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    14,     12,     1.7,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.pound, g.heavymachine, g.morereload, g.morereload]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.heavymachine2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Maga-MachineGun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    10,     13,     2,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.pound, g.destroy, g.heavymachine]),
                TYPE: exports.bullet,
            }, },
        ],
    };
 
exports.flankpound = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Flank Pounder',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankpound]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  20,    12,      1,      0,      0,      180,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankpound]),
                TYPE: exports.bullet,
            }, },
        ],
    };

            exports.autoflankp = makeAuto(exports.flankpound, "auto-flank pounder")
            exports.spray = {
                PARENT: [exports.genericTank],
                LABEL: 'Sprayer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
   
        exports.mini = {
            PARENT: [exports.genericTank],
            LABEL: 'Minigun',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };

exports.miniflank = {
            PARENT: [exports.genericTank],
            LABEL: 'Minigun Defender',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      180,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      180,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      180,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };

            exports.automini = makeAuto(exports.mini , "Auto-Minigun")
            exports.stream = {
                PARENT: [exports.genericTank],
                LABEL: 'Streamliner',
                DANGER: 7,
                BODY: {
                    FOV: 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  25,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  17,     8,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.hybridmini = makeHybrid(exports.mini, "CropDuster");
            exports.minitrap = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                LABEL: 'Barricade', 
                STAT_NAMES: statnames.trap,
                BODY: {
                    FOV: 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [  24,     8,      1,      0,      0,      0,      0, ], 
                            }, {
                    POSITION: [   4,     8,     1.3,     22,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     18,     0,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     14,     0,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
    
    exports.multer = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Multer',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  25,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.sniper, g.lessreload, g.stronger]),
                TYPE: exports.bullet,
            }, },
        ],
    };
  exports.multer3 = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: '',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  25,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.sniper, g.stronger]),
                TYPE: exports.bullet,
            }, }, {
             POSITION: [  3,    15.5,      1,      12,      0,      0,      0,   ], 
            }, {
             POSITION: [  3,    15.5,      1,      19,      0,      0,      0,   ], 

            }, 
        ],
    };
  exports.multer2 = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Heavy Multer',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  26,    14,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.sniper, g.lessreload]),
                TYPE: exports.bullet,
            }, },
        ],
    };
 exports.pound = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Pounder',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  21,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.flankmulter = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Flank Multer',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  25,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.sniper, g.lessreload, g.lessreload]),
                TYPE: exports.bullet,
            }, }, {
                 POSITION: [  25,    12,      1,      0,      0,      180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.sniper, g.lessreload, g.lessreload]),
                TYPE: exports.bullet,
            }, },
        ],
    };
   exports.titan = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Titan',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                           POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      4,      180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      180,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, },
            ],
        };

        exports.autopound = makeAuto(exports.pound, "Auto-Pounder")
        exports.destroy = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Destroyer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, },
            ],
        };
exports.manowar = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Man-O-War',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,    14,      1,      0,      0,      90,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, }, {
                   POSITION: [  19,    14,      1,      0,      0,      -90,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                      }, }, {   
                POSITION: [  17,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  17,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                }, },
            ],
        };
 exports.greifer = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            INVISIBLE: [0.3, 0.01],
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Greifer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,    14,    -1.25,    0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, },
            ],
        };
exports.greifer2 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            INVISIBLE: [0.5, 0.01],
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Abliterator',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [ 20.5,  19.5,     -2,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
                    TYPE: exports.bullet,
                }, },
            ],
        };
            exports.autodestroy = makeAuto(exports.destroy , "Auto-Destroyer")
            exports.anni = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'Annihilator',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20.5,  19.5,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
            exports.hiveshooter = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.speed * 0.8,
                },
                LABEL: 'Hive shooter',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                            TYPE: exports.hive,
                        }, }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                    }
                ],
            };
exports.payao = {
        PARENT: [exports.genericTank],
        LABEL: '',
        SIZE: 24,
        SHAPE: 4,
        VARIES_IN_SIZE: true,
    },
exports.opdestroy = {
            PARENT: [exports.payao],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'OPDestroyer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  24,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, }, {
                  POSITION: [  0,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil, g.weak, g.weak]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  0,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil, g.weak, g.weak]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  0,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil, g.weak, g.weak]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  0,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.weak, g.weak]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  0,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.weak, g.weak]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                            LABEL: gunCalcNames.thruster,
                }, },
            ],
        };
 exports.ayao = makeHybrid(exports.opdestroy, 'Ayao');

            exports.hybrid = makeHybrid(exports.destroy, 'Hybrid');
            exports.shotgun2 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Shotgun',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                },
                GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                    POSITION: [  4,      3,      1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [ 15,     14,      1,     6,       0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  8,     14,    -1.3,    4,       0,      0,      0,   ], }
                ],
            };

exports.shotgun3 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'OP Shotgun',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                },
                GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                    POSITION: [  4,      3,      1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun3]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun3]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun3]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun3]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun3]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun3]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun3]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun3]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach,  g.shotgun3]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [ 15,     14,      1,     6,       0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.fake, g.shotgun3]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  8,     14,    -1.3,    4,       0,      0,      0,   ], }
                ],
            };

        exports.builder = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Trapper',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                }, {
                POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.block,
                    }, },
            ],
        };
 exports.waller = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'wall placer',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                }, {
                POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block, g.morespeed]),
                        TYPE: exports.block,
                    }, },
            ],
        };

        exports.gladiator = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Gladiator',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                      }, {
                POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.block,
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      4,      180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      180,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, },
            ],
        };

exports.gatling = {
        PARENT: [exports.genericTank],
        LABEL: 'Gatling Gun',
        BODY: {    
            FOV: 1.1,
              },
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    15,     10,     1.4,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gatling]),
                TYPE: exports.bullet,
            }, },
        ],
    };
            exports.halfnhalf = makeHybrid(exports.gatling,'Gatling-Hybrid')
            exports.engineer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Engineer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 6,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.pillbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };
 exports.missilet = {
                PARENT: [exports.genericTank],
                LABEL: 'Rocket',
            
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  16,     8,      1,      0,      0,     140,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.muchmorerecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {
                POSITION: [  16,     8,      1,      0,      0,     220,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.muchmorerecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {
                    POSITION: [  10,    14,     1,     8,      0,      180,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.thruster]),
                        TYPE: exports.bullet,
                      LABEL: 'Pounder Thruster',
                    }, },
                ],
            };


            exports.construct = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega Trapper',
                STAT_NAMES: statnames.trap,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.7,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    18,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    18,     1.2,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                            TYPE: exports.block,
                        }, }, 
                ],
            };

         exports.alphacon = {
                PARENT: [exports.genericTank],
                LABEL: 'Alpha Trapper',
                STAT_NAMES: statnames.trap,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.7,
                    FOV: base.FOV * 1.50,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    18,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    20,     1.2,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct, g.anni, g.lessreload, g.lessreload]),
                            TYPE: exports.block,
                        }, }, 
                ],
            };

            exports.protector = makeHybrid(exports.builder, 'Protector');
            exports.autobuilder = makeAuto(exports.builder);
            exports.conq = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'conqueror',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  21,    14,      1,      0,      0,     180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  18,    14,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.1,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.block,
                        }, },
                ],
            };
            exports.bentboomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Bent Boomer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   8,    10,      1,      8,     -2,     -35,     0,   ],
                        }, {
                    POSITION: [   8,    10,      1,      8,      2,      35,     0,   ],
                        }, {
                    POSITION: [   2,    10,     1.3,     16,    -2,     -35,     0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                            TYPE: exports.boomerang,
                        }, }, {
                    POSITION: [   2,    10,     1.3,     16,     2,      35,    0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
            exports.boomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Boomer',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
exports.heavyboomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Heavy Boomer',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                   POSITION: [   5,    21,      1,       1.5,     0,      0,      0,   ],
                        }, {
                    POSITION: [   5,    14,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    14,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                    POSITION: [   2,    14,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.pound, g.lessreload, g.lessreload]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
    exports.boomer3 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Tri Boomer',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.lessreload, g.lessreload]),
                            TYPE: exports.boomerang,
                        }, }, {
                    POSITION: [   5,    10,      1,      14,     0,      120,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      120,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      120,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      120,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.lessreload, g.lessreload]),
                            TYPE: exports.boomerang,
                        }, }, {
                    POSITION: [   5,    10,      1,      14,     0,      240,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      240,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      240,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      240,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.lessreload, g.lessreload]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
            exports.quadtrapper = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'SteamPunk',
                STAT_NAMES: statnames.trap, 
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     6,      1,      0,      0,     45,      0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     45,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     135,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     135,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     225,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     225,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     315,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     315,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, },
                ],
            };

        exports.artillery = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Artillery',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
exports.artillerymg = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Unnamned',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                  POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
                    }, },
            ],
        };
  exports.artcrusier = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Marauder',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
    POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      4,      180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      180,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, },
            ],
        };
            exports.general = makeHybrid(exports.artillery,"general")
            exports.AutoArt = makeAuto(exports.artillery, "Auto-Artillery")
            exports.mortar = {
                PARENT: [exports.genericTank],
                LABEL: 'Mortar',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     3,      1,      0,     -8,     -7,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  13,     3,      1,      0,      8,      7,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,     -6,     -7,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,      6,      7,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                            TYPE: exports.bullet,
                            LABEL: 'Heavy',
                        }, },
                ],
            };
            exports.skimmer = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Skimmer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.missile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
            
            exports.spread = {
                PARENT: [exports.genericTank],
                LABEL: 'Spreadshot',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     4,      1,      0,    -0.8,    -75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,    -1.0,    -60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,    -1.6,    -45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,    -2.4,    -30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,    -3.0,    -15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {                    
                    POSITION: [  13,     4,      1,      0,     0.8,     75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,     1.0,     60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,     1.6,     45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,     2.4,     30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,     3.0,     15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  13,    10,     1.3,     8,      0,      0,      0,     ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spreadmain, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Pounder',
                        }, },
                ],
            };

    exports.flank = {
        PARENT: [exports.genericTank],
        LABEL: 'Flank Guard',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
        exports.hexa = {
            PARENT: [exports.genericTank],
            LABEL: 'Hexa Tank',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.octo = {
                PARENT: [exports.genericTank],
                LABEL: 'Octo Tank',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      45,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     135,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     225,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     315,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.heptatrap = (() => {
                let a = 360/7, d = 1/7;
                return {
                    PARENT: [exports.genericTank],
                    LABEL: 'Hepta-Trapper',
                    DANGER: 7,
                    BODY: {
                        SPEED: base.SPEED * 0.8,
                    },
                    STAT_NAMES: statnames.trap,
                    HAS_NO_RECOIL: true,
                    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,      a,     4*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      a,     4*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     2*a,    1*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     2*a,    1*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     3*a,    5*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     3*a,    5*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     4*a,    2*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     4*a,    2*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     5*a,    6*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     5*a,    6*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     6*a,    3*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     6*a,    3*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, },
                    ],
                };
            })(),
            exports.hexatrap = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Hexa-Trapper',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                STAT_NAMES: statnames.trap,
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     60,     0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     60,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     120,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     180,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     240,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     300,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     300,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                  ],
              }, 'Hexa-Trapper');
        exports.tri = {
            PARENT: [exports.genericTank],
            LABEL: 'Tri-Angle',
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
             ],
         };
            exports.booster = {
                PARENT: [exports.genericTank],
                LABEL: 'Booster',
                BODY: {
                    HEALTH: base.HEALTH * 0.5,
                    SHIELD: base.SHIELD * 0.6,
                    DENSITY: base.DENSITY * 0.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            
            exports.fighter = {
                PARENT: [exports.genericTank],
                LABEL: 'Fighter',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      1,     -90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.surfer = {
                PARENT: [exports.genericTank],
                LABEL: 'surfer',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,         
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,      1,     -90,     9,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,     
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.bomber = {
                PARENT: [exports.genericTank],
                LABEL: 'Bomber',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     130,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     230,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.morerecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

exports.gmissile = {
    PARENT: [exports.genericTank],
    LABEL: 'Missile',
    DANGER: 6,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [16, 3.5, 1, 0, 3.75, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [7.5, 9.5, 0.6, 7, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, ],
        TURRETS: [{
        POSITION: [11, 0, 0, 0, 360, 1, ],
        TYPE: [exports.auto3gun, {
            INDEPENDENT: true,
        }]
    }, ],
};

            exports.autotri = makeAuto(exports.tri),   
            exports.autotri.BODY = {
                SPEED: base.SPEED,
            },   
            exports.falcon = {
                PARENT: [exports.genericTank],
                LABEL: 'Falcon',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [   5,    8.5,   -1.6,     8,      0,      0,      0,   ],
                        }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };

        exports.auto3 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-3',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.auto3gun,
                        },
            ],
        };

    exports.tripound = {
        PARENT: [exports.genericTank],
        LABEL: 'Tri Pounder',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.pound]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  20,    12,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.pound]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  20,    12,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.pound]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
            exports.auto5 = {
                PARENT: [exports.genericTank],
                LABEL: 'Auto-5',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     8,      0,      0,     190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,      72,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     144,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     216,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     288,    190, 0], 
                        TYPE: exports.auto5gun,
                            },
                ],
            };
            exports.heavy3 = {
                BODY: {
                    SPEED: base.SPEED * 0.95,
                },
                PARENT: [exports.genericTank],
                LABEL: 'Mega-3',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  14,     8,      0,      0,     190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     120,    190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     240,    190, 0], 
                        TYPE: exports.heavy3gun,
                            },
                ],
            };
          
            exports.tritrap = {
                LABEL: 'Auto-tri-trapper',
                BODY: {
                    SPEED: base.SPEED * 1.1,
                },
                PARENT: [exports.genericTank],
                DANGER: 6,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  12,     8,      0,      0,     190, 0], 
                        TYPE: exports.tritrapgun,
                            }, {
                    POSITION: [  12,     8,      0,     120,    190, 0], 
                        TYPE: exports.tritrapgun,
                            }, {
                    POSITION: [  12,     8,      0,     240,    190, 0], 
                        TYPE: exports.tritrapgun,
                            },
                ],
            };
            exports.sniper3 = { 
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Sniper-3',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.25,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     8,      0,      0,     170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     120,    170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     240,    170, 0], 
                        TYPE: exports.sniper3gun,
                            },
                ],
            };
 exports.railgun3 = { 
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'RailGun-3',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.25,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     8,      0,      0,     170, 0], 
                        TYPE: exports.autorailgun,
                            }, {
                    POSITION: [  13,     8,      0,     120,    170, 0], 
                        TYPE: exports.autorailgun,
                            }, {
                    POSITION: [  13,     8,      0,     240,    170, 0], 
                        TYPE: exports.autorailgun,
                            },
                ],
            };
            exports.auto4 = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Auto-4',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,      45,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     135,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     225,    160, 0],
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     315,    160, 0],
                        TYPE: exports.auto4gun,
                            },
                ],
            };

  exports.shield = {
            PARENT: [exports.genericTank],
            LABEL: 'Shield',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };

exports.shield3 = {
            PARENT: [exports.genericTank],
            LABEL: 'Burst Trap',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                           }, }, {
                POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };

 exports.tritrapper2 = {
            PARENT: [exports.genericTank],
            LABEL: 'Tri Trapper',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                  }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,      120,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
               POSITION: [  13,     8,      1,      0,      0,      240,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap
                    }, },
            ],
        };

        exports.huntertrap = {
            PARENT: [exports.genericTank],
            LABEL: 'MarksMan',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    12,      1,      0,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                        TYPE: exports.bullet,
                    }, }, { 
               POSITION: [  13,     9,      1,      0,      0,      180,     0,   ],
                    }, {
                POSITION: [   4,     9,     1.7,    13,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };

exports.rifletrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Slayer',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                     }, }, {
                 POSITION: [  13,     8,      1,      0,      0,      180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

        exports.flanktrap = {
            PARENT: [exports.genericTank],
            LABEL: 'Trap Guard',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };


            exports.autoflankt = makeAuto(exports.flanktrap, "auto-TrapGuard"),
            exports.guntrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Gunner Trapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    FOV: base.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [  13,    11,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    11,     1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.halfrecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

 exports.hurricane = {
                PARENT: [exports.genericTank],
                LABEL: 'Hurricane',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,    3.5,     1,      0,        0,    0,     0, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,   30,   0.5, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,   60,  0.25, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,   90,  0.75, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  120,     0, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  150,   0.5, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  180,  0.25, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  210,  0.75, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  240,     0, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  270,   0.5, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  300,  0.25, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  330,  0.75, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };

            exports.hybridgunn = makeHybrid(exports.gunner, 'Attacker');

            exports.bushwhack = {
                PARENT: [exports.genericTank],
                LABEL: 'Snipe Guard',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,    8.5,     1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    8.5,    1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

   exports.twintrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Twin Trap Guard',
                STAT_NAMES: statnames.generic,
                DANGER: 6,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.twin]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,     8,      1,      0,     5.5,    190,     0,   ],
                        }, {
                    POSITION: [   4,     8,     1.7,    13,     5.5,    190,     0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.twin]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,     8,      1,      0,    -5.5,    170,    0.5,  ],
                        }, {
                    POSITION: [   4,     8,     1.7,    13,    -5.5,    170,    0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

            exports.stalker = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                INVISIBLE: [0.08, 0.03],
                LABEL: 'Stalker',
                BODY: {
                    //ACCELERATION: base.ACCELERATION * 0.55,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.35,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,    8.5,     -2,      0,      0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
exports.blaster = {
        PARENT: [exports.genericTank],
        LABEL: 'Blaster',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    9,     10,     1.6,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                TYPE: exports.bullet,
            }, },
        ],
    };

exports.blastertwin = {
        PARENT: [exports.genericTank],
        LABEL: 'Flamethrower',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    9,     10,     1.6,     12,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    9,     10,     1.6,     7,      0,      0,      1,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                TYPE: exports.bullet,
            }, },
        ],
    };

exports.Deleter = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Deleter',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.80,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  25,    12,     -0.5,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.sniper]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   8,    12,    -1.3,    5,      0,      0,      0,   ],
                },
            ],
        };

exports.hotshot = {
            PARENT: [exports.genericTank],
            LABEL:'eliminator',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     12,      1,      0,      0,      0,      0, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     12,      1,      0,      0,      0,    0.333, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  16,     12,      1,      0,      0,      0,    0.667, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.pound]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };

exports.Splasher = {
                PARENT: [exports.genericTank],
                LABEL: 'Splasher',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,     9,      1.6,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  11,    12,     1.4,     8,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.morespeed, g.threequartersrof]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };

       exports.poundangle = {
            PARENT: [exports.genericTank],
            LABEL: 'Slammer',
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     12,      1,      0,      0,      0,      .6,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil, g.pound]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {
                POSITION: [  16,     12,      1,      0,      -2,     150,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.pound]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {
                POSITION: [  16,     12,      1,      0,      2,     210,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.pound]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        };

    exports.twinmachine = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    13,     6.25,   1.4,     6,     5.6,     2,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
              }, }, {
            POSITION: [    13,     6.25,   1.4,     6,    -5.6,    358,     0.4,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.bulletaccel = {
    PARENT: [exports.bullet],
    CONTROLLERS: ['alwaysFire'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  1,     0.0001,      1,      0,      0,      180,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.doublereload, g.tonsmorrecoil, g.weak]),
            TYPE: exports.bullet,
            AUTOFIRE: true,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def
            MAX_CHILDREN: 0,            // def
            ALT_FIRE: false,            // def
            NEGATIVE_RECOIL: false,     // def
        }, },
    ],
};

exports.gatlingaccel = {
        PARENT: [exports.genericTank],
        LABEL: 'Accelerator',
        BODY: {    
            FOV: 1.3,
              },
      
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    17,     9,     1.4,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain, g.halfspeed, g.lessreload]),
                TYPE: exports.bulletaccel,
            }, },
        ],
    };

    exports.bentmachine = {
        PARENT: [exports.genericTank],
        LABEL: 'Tri Blaster',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    10.5,   10,     1.4,     7,      2,     18,     0.4,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
              }, }, {
            POSITION: [    10.5,   10,     1.4,     7,     -2,    -18,     0.4,  ],    
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
              }, }, {
            POSITION: [    12.5,   10,     1.4,     8,      0,     0,       0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };

exports.mach3gun = {
    PARENT: [exports.genericTank],
    LABEL: 'machinegun-3 Gun',
    BODY: {
        FOV: 5,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,     1.4,     0,      2.2,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.auto]),
                TYPE: exports.bullet,
                  }, }
        ],
    };
exports.mach3 = { 
            PARENT: [exports.genericTank],
            LABEL: 'MachineGun-3',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  13,     8,      0,      0,     190, 0], 
                    TYPE: exports.mach3gun,
                        }, {
                POSITION: [  13,     8,      0,     120,    190, 0], 
                    TYPE: exports.mach3gun,
                        }, {
                POSITION: [  13,     8,      0,     240,    190, 0], 
                    TYPE: exports.mach3gun,
                        },
              ],
  };

 exports.hunter3 = {
            PARENT: [exports.genericTank],
            LABEL: 'Carnivore',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.3,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  26,     7,      1,      4,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.sniper]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  23,    11,      1,      4,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sniper]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   7,    10.5,    -1.6,    6,      0,      0,      0,   ], 
                    }, 
            ],
        };

   exports.hexapound = {
            PARENT: [exports.genericTank],
            LABEL: 'Death Star',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     10,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.hexapound]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     10,     1,      0,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.hexapound]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     10,     1,      0,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.hexapound]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     10,     1,      0,      0,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.hexapound]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     10,     1,      0,      0,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.hexapound]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     10,     1,      0,      0,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.hexapound]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };

exports.assapellet = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'buttbuttin',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.3,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
           POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
              TYPE: exports.bullet, 
                   }, }, {
                  POSITION: [  13,    10.5,    1,      0,      0,      0,      0,   ],
                }, {
           POSITION: [      18,    4,       1,       0,    4.0,    180,    0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
                   }, }, { 
            POSITION: [     18,    4,       1,       0,    -4.0,   180,   0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
                }, }, {
              POSITION: [   12,   15,       1,       0,      0,     180,   0,   ],
                   }, 
            ],
        };

            exports.spreadsnipe = {
                PARENT: [exports.genericTank],
                LABEL: 'dispencer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     4,      1,      0,     -3,     -9,      0,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spread, g.sniper, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  15,     4,      1,      0,    -2.5,    -6,      0,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spread, g.sniper, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,     -2,     -3,      0,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spread, g.sniper, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  13,    4,       1,      0,      3,      9,      0,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spread, g.sniper, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  15,    4,       1,      0,     2.5,     6,      0,    ], 
                        PROPERTIES: {  
                            SHOOT_SETTINGS: combineStats([g.basic, g.spread, g.sniper, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, { 
                    POSITION: [  16,    4,       1,      0,     2,      3,       0,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spread, g.sniper, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, { 
                    POSITION: [  25.5,     7,      1,      0,      0,     0,      0,   ], 
            PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.spread, g.lessreload]),
              TYPE: exports.bullet, 
                   }, }, {
                  POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
                        }, 
                ],
            };

    exports.director2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Apprentice',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 10,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,     15,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.moredamage]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };

exports.Amissile = {
    PARENT: [exports.swarm],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 150,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  5,    10,     1.4,     8,      0,     180,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.thruster]),
                TYPE: [exports.bullet,]
                    }, },
          ],
};

    exports.machineflank = {
        PARENT: [exports.genericTank],
        LABEL: 'flank Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    12,     10,     1.4,     8,      0,      180,     0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };

    exports.machinetri = {
        PARENT: [exports.genericTank],
        LABEL: 'tri Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    12,     10,     1.4,     8,      0,      120,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    12,     10,     1.4,     8,      0,      240,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };
      exports.basic3 = {
        PARENT: [exports.genericTank],
        LABEL: 'HeatSeeker',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
           POSITION: [   7,    12.5,    0.6,     14,      0,      0,     0.5,  ], 
                  }, {
               POSITION: [14.5,  8,     1,       0,       0,      0,      0,   ],   
               PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.mach]),
                TYPE: exports.Amissile,
               }, }, {
                POSITION: [15,   16,     1,       0,       0,      0,      0,   ],
              }, 
        ],
    };

 exports.basic4 = {
        PARENT: [exports.genericTank],
        LABEL: 'miniHeatSeeker',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
           POSITION: [   7,    12.5,    0.6,     14,      0,      0,     0.5,  ], 
                  }, {
               POSITION: [14.5,  8,     1,       0,       0,      0,      0,   ],   
               PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.lessreload]),
                TYPE: exports.Amissile,
              }, },
        ],
    };

exports.fightermissile = {
     PARENT: [exports.bullet],
    LABEL: 'FighterBullet',
    INDEPENDENT: true,
  BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  15,     5,      1,      0,      0,    150,      0,   ], 
            PROPERTIES: {
              AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.thruster, g.morespeed, g.morereload]),
                TYPE: exports.bullet,
            }, }, { 
            POSITION: [15,   5,      1,      0,      0,    -150,      0,   ], 
            PROPERTIES: {
              AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.thruster, g.morespeed, g.morereload]),
                TYPE: exports.bullet,
            }, }, {
           POSITION: [  15,   5,     1,      0,      0,      90,      0,   ], 
            PROPERTIES: {
              AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.thruster, g.morespeed, g.morereload]),
                TYPE: exports.bullet,
            }, }, { 
            POSITION: [  15,  5,     1,      0,      0,     -90 ,    0,   ],  
              PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.thruster, g.morespeed, g.morereload]),
                TYPE: exports.bullet,
            }, }, 
    ],
};
         exports.fightershot = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Fighter Shot',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     11,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.fightermissile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };

exports.rocket = {
    PARENT: [exports.bullet],
    LABEL: 'Rocket',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120
    },
    GUNS: [{
        POSITION: [6, 10, 1.5, 9, 0, 180, 7.5],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.rocket]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }]
};

exports.seek = {
	PARENT: [exports.genericTank],
	LABEL: 'Seeker',
	DANGER: 7,
	GUNS: [{
		POSITION: [19, 8, 1, 0, -2, -20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, 2, 20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [24, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
			TYPE: exports.bullet
		}
	}]
};

  exports.rocketeer = {
    PARENT: [exports.genericTank],
    LABEL: 'Rocketeer',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.65,
        SPEED: base.SPEED * 0.75,
        FOV: 1.25
    },
    GUNS: [{
        POSITION: [10, 12.5, -0.5, 9.5, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.rocketr]),
            TYPE: exports.rocket,
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    }, {
        POSITION: [16.5, 11.5, -1.5, 0, 0, 0, 0]
    }]
};

 exports.automgflank = makeAuto(exports.machineflank , "Auto-Flank Machine Gun ")

 exports.autobulletturret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    11,      1,      0,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.autobullet = {
    LABEL: 'Auto-Bullet',
    PARENT: [exports.bullet],
    CONTROLLERS: ['nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1],
            TYPE: exports.autobulletturret,
        }
    ]
};
exports.gbasic = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto Shot',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     10,      1,      0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.autobullet,
        }, },
    ],
};
           exports.landmine = {
                PARENT: [exports.genericTank],
                LABEL: 'Landmine',
                DANGER: 7,
                INVISIBLE: [0.06, 0.01],
                BODY: {
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 2,
                },
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  21.5,   0,      0,      0,     360,  0,],
                    TYPE: exports.smasherBody,
                }, { /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  21.5,   0,      0,      90,     360,  0,],
                    TYPE: exports.smasherBody,
                }],
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
            };

exports.pelletor = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Pelletor',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                }, 
            ],
        };

exports.hewnpelletor = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Hewn Pelletor',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
               POSITION: [  13,     2.5,      1,      0,     3.5,     20,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  13,     2.5,      1,      0,    -3.5,     -20,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                }, 
            ],
        };
exports.webber2 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Webber',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
               POSITION: [  13,     2.5,      1,      0,     3.5,     20,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  13,     2.5,      1,      0,    -3.5,     -20,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                }, 
            ],
        };
exports.gsplit = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Split',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     2.5,      1,      0,     2,     10,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     10,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      10,      0,   ],
            }, {
            POSITION: [  17,     2.5,      1,      0,     3,     -10,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -2,     -10,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      -10,      0,   ],
               }, {
            POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [ 18,     5,      1,      0,     0,      0,      0,],
              PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.lessreload, g.lessreload, g.pound]),
              TYPE: exports.bullet,
              }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                }, 
            ],
        };

exports.doublehewn = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Double Hewn',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
               POSITION: [  13,     2.5,      1,      0,     3.5,     20,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  13,     2.5,      1,      0,    -3.5,     -20,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, {
            POSITION: [  17,     2.5,      1,      0,     3,     180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     180,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            }, }, {
               POSITION: [  13,     2.5,      1,      0,     3.5,     200,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  13,     2.5,      1,      0,    -3.5,     -200,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      180,      0,   ],
                }, 
            ],
        };
exports.heptashot = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Hepta Shot',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  13,     4,      1,      0,     -3,    -30,    1.001, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,     4,      1,      0,      3,     30,    1.001, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
               POSITION: [  16,     4,      1,      0,     -3,    -20,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     4,      1,      0,      3,     20,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     4,      1,      0,     -2,    -10,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     4,      1,      0,      2,     10,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     4,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                }, },
            ],
        };
exports.puntgun = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Punt Gun',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  18,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  18,     2.5,      1,      0,    -3,     0,     0.15,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  16,     2.5,      1,      0,     3,     0,      0.3,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  16,     2.5,      1,      0,    -3,     0,     0.45,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  14,     2.5,      1,      0,     3,     0,      0.6,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  14,     2.5,      1,      0,    -3,     0,     0.75,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0.9,   ],
                }, 
            ],
        };
exports.puntgun2 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Raider',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  18,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  18,     2.5,      1,      0,    -3,     0,     0.15,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  16,     2.5,      1,      0,     3,     0,      0.3,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  16,     2.5,      1,      0,    -3,     0,     0.45,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  14,     2.5,      1,      0,     3,     0,      0.6,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  14,     2.5,      1,      0,    -3,     0,     0.75,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0.9,   ],
            }, {
             POSITION: [   7,    7.5,    0.6,     7,      0,      90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
            POSITION: [   7,    7.5,    0.6,     7,      0,      -90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                }, },
            ],
        };
exports.puntgunlong = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Sword',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  24,     5,      1,      0,     0,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  22,     5,      1,      0,    0,     0,     0.15,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  20,     5,      1,      0,     0,     0,      0.3,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  18,     5,      1,      0,    0,     0,     0.45,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  16,     5,      1,      0,     0,     0,      0.6,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  14,     5,      1,      0,    0,     0,     0.75,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0.9,   ],
            }, {
              POSITION: [  13,     8,      1,      0,      0,      180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                }, },
            ],
        };
exports.autopuntgun = makeAuto(exports.puntgun,"Auto-Punt Gun")
exports.puntgunnner = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Punt Gunnner',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  20,     2.5,      1,      0,     3,     0,      1.5,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  20,     2.5,      1,      0,    -3,     0,     3,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  18,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  18,     2.5,      1,      0,    -3,     0,     0.15,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  16,     2.5,      1,      0,     3,     0,      0.3,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  16,     2.5,      1,      0,    -3,     0,     0.45,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  14,     2.5,      1,      0,     3,     0,      0.6,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  14,     2.5,      1,      0,    -3,     0,     0.75,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0.9,   ],
                }, 
            ],
        };
exports.puntgunmini = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Triplet Mini Gun',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  18,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  18,     2.5,      1,      0,    -3,     0,     0.15,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  16,     2.5,      1,      0,     3,     0,      0.3,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  16,     2.5,      1,      0,    -3,     0,     0.45,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  14,     2.5,      1,      0,     3,     0,      0.6,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  14,     2.5,      1,      0,    -3,     0,     0.75,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [  20,     2.5,      1,      0,     0,     0,      0.9,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  18,     2.5,      1,      0,     0,     0,      1.5,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
              }, }, {
            POSITION: [  16,     2.5,      1,      0,     0,     0,      3,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      4.5,   ],
                }, 
            ],
        };

exports.bore = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Borer',
         BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  23,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  23,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                }, 
            ],
        }; 
exports.bore2 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Sharp Shot',
         BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     2.5,      1,      0,     7.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -7.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
              TYPE: exports.bullet,
            }, }, {
              POSITION: [  25,    6.5,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                }, },
            ],
        }; 

exports.hybore = makeHybrid(exports.bore,"Commando")
exports.commando = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Pearcer',
         BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  23,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  23,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, {
              POSITION: [  13,     8,      1,      0,      0,      180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                }, },
            ],
        };
exports.mbore = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Scorpian',
         BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  23,     3.5,      1,      0,     3.2,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.moredamage, g.lessreload]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  23,     3.5,      1,      0,    -3.2,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.moredamage, g.lessreload]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                }, 
            ],
        };
exports.gunbore = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Gunner Borer',
         BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     2.5,      1,      0,     4,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.lessreload]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  20,     2.5,      1,      0,    -4,     0,     0.5,  ], 
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.lessreload]),
                TYPE: exports.bullet,
            }, }, {
             POSITION: [  23,     2.5,      1,      0,     2,     0,      1,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.lessreload]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  23,     2.5,      1,      0,    -2,     0,     0.25,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.lessreload]),
              TYPE: exports.bullet,
            }, }, { 
              POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                }, 
            ],
        };

exports.pellettriptwin = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Triptwin Pelletor',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, {
            POSITION: [  17,     2.5,      1,      0,     3,     120,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     120,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      120,      0,   ],
            }, {
            POSITION: [  17,     2.5,      1,      0,     3,     240,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     240,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      240,      0,   ],
                }, 
            ],
        };
exports.pellettriptwin2 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Triptwin Pound Pelletor',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     3.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     3.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, {
            POSITION: [  17,     3.5,      1,      0,     3,     120,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     3.5,      1,      0,    -3,     120,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      120,      0,   ],
            }, {
            POSITION: [  17,     3.5,      1,      0,     3,     240,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     3.5,      1,      0,    -3,     240,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      240,      0,   ],
                }, 
            ],
        };
exports.pellettriptwin3 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Bird',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     3.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
              }, }, {
            POSITION: [  17,     3.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
              POSITION: [  19,     3.5,      1,      0,     0,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, {
            POSITION: [  17,     3.5,      1,      0,     3,     180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     3.5,      1,      0,    -3,     180,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      180,      0,   ],
                }, 
            ],
        };
exports.warlord = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'War Lord',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     3.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
              }, }, {
            POSITION: [  17,     3.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
              POSITION: [  19,     3.5,      1,      0,     0,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, {
            POSITION: [   7,    7.5,    0.6,     7,      0,      90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     0,      -90,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                }, },
            ],
        };
exports.pellettriptwin4 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Guard',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     3.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     3.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, {
            POSITION: [  13,     10,      1,      0,      0,      180,     0,   ],
                    }, {
                POSITION: [   4,     10,     1.7,    0,      0,      180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                }, },
            ],
        };
exports.pelletquintuplet = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'quintuplet Pelletor',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, {
            POSITION: [  17,     2.5,      1,      0,     3,     72,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     72,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      72,      0,   ],
            }, {
            POSITION: [  17,     2.5,      1,      0,     3,     144,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     144,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      144,      0,   ],
            }, {
            POSITION: [  17,     2.5,      1,      0,     3,     216,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     216,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      216,      0,   ],
            }, {
            POSITION: [  17,     2.5,      1,      0,     3,     288,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     288,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      288,      0,   ],
                }, 
            ],
        };

exports.grenade = {
    PARENT: [exports.bullet],
    LABEL: 'Grenade',
    INDEPENDENT: true,
    FACING_TYPE: 'turnWithSpeed',
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  15,     7,      1,      0,      0,     0,       0.5,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.lowpower, g.hexatrap, g.halfspeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
            }, }, {
        POSITION: [  15,     7,      1,      0,      0,     180,     0.5,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.lowpower, g.hexatrap, g.halfspeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],  
                   }, },
    ],
};

exports.skimmer2 = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Hammer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.grenade,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
exports.skimmer3 = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Glider',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    12,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    11,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.arty, g.arty, g.skim, g.morespeed]),
                            TYPE: exports.grenade,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };

exports.gautobulletturret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: false,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  1,    11,      1,      0,      0,      180,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.heatseek, g.thruster, g.weak, g.weak, g.weak, g.morespeed]),
                TYPE: exports.bullet,
              LABEL: gunCalcNames.thruster,
            }, },
    ],
};
exports.gautobullet = {
    LABEL: 'Auto-Bullet',
    PARENT: [exports.bullet],
    CONTROLLERS: ['nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      180,     360,  1],
            TYPE: exports.gautobulletturret,
        }
    ]
};
exports.abasic = {
    PARENT: [exports.genericTank],
    LABEL: 'Guided Missle',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     10,      1,      0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.gautobullet,
                              }, }, {
                POSITION: [   5,    10,    -1.6,    6,      0,      0,      0,   ], 
        }, 
    ],
};
exports.quadabasic = {
    PARENT: [exports.genericTank],
    LABEL: 'Guided Missle',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     10,      1,      0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.gautobullet,
                              }, }, {
                POSITION: [   5,    10,    -1.6,    6,      0,      0,      0,   ], 
                              }, {
                POSITION: [  17,     10,      1,      0,      0,      90,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.gautobullet,
                              }, }, {
                POSITION: [   5,    10,    -1.6,    6,      0,      90,      0,   ], 
                              }, {
                                POSITION: [  17,     10,      1,      0,      0,      180,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.gautobullet,
                              }, }, {
                POSITION: [   5,    10,    -1.6,    6,      0,      0,      180,   ], 
                              }, {
                                POSITION: [  17,     10,      1,      0,      0,      270,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.gautobullet,
                              }, }, {
                POSITION: [   5,    10,    -1.6,    6,      0,      270,      0,   ], 
        }, 
    ],
};

exports.harrower = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.15,
    },
    LABEL: 'Harrower',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    12,    -0.5,     9,      0,      0,      0,  ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim]),
                TYPE: exports.hypermissile,
            }, }, {
        POSITION: [  13,    12,      1,      0,      0,      0,      0,  ],
            },
    ],
};

  exports.divergent = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'divergent',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [      18,    4,       1,       0,    4.0,    180,    0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
                   }, }, { 
            POSITION: [     18,    4,       1,       0,    -4.0,   180,   0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
                }, }, {
              POSITION: [   12,   15,       1,       0,      0,     180,   0,   ],
            }, 
        ],
    };
exports.sniperminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Sniper Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.6,
        SPEED: 2.75,
        ACCELERATION: 0.25,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  23,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.snipefact = {
            PARENT: [exports.genericTank],
            LABEL: 'Sniper Factory',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  6.5,    10,      1,     10.5,    0,      0,      0,   ], 
                }, {
                POSITION: [   3,     12,      1,      15,     0,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 3,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.sniperminion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                    POSITION: [  5.5,    12,      1,      8,      0,      0,      0,   ],
                }, {
                POSITION: [   5,     12,      1,      19.5,   0,      0,      0,   ],
                }
            ],
        };
  exports.boomertrap = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Round Shot',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                            TYPE: exports.boomerang,
                        }, }, {
                POSITION: [  13,     9,      1,      0,      0,      180,     0,   ],
                    }, {
                POSITION: [   4,     9,     1.7,    13,      0,      180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
exports.twinminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Sniper Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
       POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
        }, }, 
    ],
};
exports.twinfact = {
            PARENT: [exports.genericTank],
            LABEL: 'Twin Factory',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  5.5,    16,      1,      8,      0,      0,      0,   ], 
            }, {
                POSITION: [  6.5,    10,      1,     10.5,    0,      0,      0,   ], 
                }, {
                POSITION: [   3,     12,      1,      15,     0,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 3,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.twinminion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                    POSITION: [  5.5,    12,      1,      8,      0,      0,      0,   ], 
                }
            ],
        };
exports.poundminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Pound Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 2.5,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [  20,    12,      1,      0,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
        }, }, 
    ],
};
exports.Poundfact = {
            PARENT: [exports.genericTank],
            LABEL: 'Pound Factory',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                   POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ],
                        }, {
                    POSITION: [   2,     14,      1.4,      15.5,   0,      0,      0,   ],
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                            TYPE: exports.poundminion,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                        }, }, {
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ],
                }, 
            ],
        };
exports.mgminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Machine Gun Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 2.5,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
     POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
        }, }, 
    ],
};
exports.machinefact = {
            PARENT: [exports.genericTank],
            LABEL: 'Machine Gun Factory',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ],
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ],
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.mgminion,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                        }, }, {
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ],
                        }, {
                    POSITION: [   2,     14,      1,      18.5,   0,      0,      0,   ],
                }, 
            ],
        };
exports.trapperminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Trapper Gun Factory', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 2.5,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
           POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
        }, }, 
    ],
};
exports.trapperfact = {
            PARENT: [exports.genericTank],
            LABEL: 'Trapper Factory',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ],
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ],
                        PROPERTIES: {
                            MAX_CHILDREN: 4,
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.trapperminion,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                        }, }, {
                    POSITION: [   4,     14,      -1.1,      8,      0,      0,      0,   ],
                        }, {
                    POSITION: [   2,     14,      1,      18.5,   0,      0,      0,   ],
                }, 
            ],
        };

exports.flankminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Flank Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 2.5,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
         POSITION: [  18,     8,      1,      0,      0,      0,      0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
        }, }, 
    ],
};
exports.flankfact = {
            PARENT: [exports.genericTank],
            LABEL: 'Flank Factory',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ],
                        }, {
                    POSITION: [   2,     14,      -1.3,      15.5,   0,      0,      0,   ],
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.flankminion,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                        }, }, {
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ],
                }, 
            ],
        };
exports.pelletorminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Pelletor Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 2.5,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
         POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
        },  
    ],
};
exports.pelletorfact = {
            PARENT: [exports.genericTank],
            LABEL: 'Pelletor Factory',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   4,     14,      -1.4,      8,      0,      0,      0,   ]
                        }, {
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ],
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ],
                        PROPERTIES: {
                            MAX_CHILDREN: 4,
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.pelletorminion,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                        }, }, {
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ],
                }, 
            ],
        };
exports.droneminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Flank Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 2.5,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ],
                PROPERTIES: {
                    MAX_CHILDREN: 3,
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
        }, }, 
    ],
};
exports.dronefact = {
            PARENT: [exports.genericTank],
            LABEL: 'Drone Factory',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ],
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ],
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.droneminion,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                        }, }, {
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ],
                }, 
            ],
        };
 exports.lilengineer = {
               PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Rookie',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 4,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.pillbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };
exports.twinpillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ {
    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin,  g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, }, { 
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ],
            PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.twin,  g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};

exports.twinpillbox = {
    LABEL: ' Twin Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.twinpillboxTurret,
        }
    ]
};

exports.builder2 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Builder',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     -1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.twinpillbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };
exports.machinepillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
  GUNS: [ {
     POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.mgpillbox = {
    LABEL: ' Machine Gun Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.machinepillboxTurret,
        }
    ]
};

exports.constructor2 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Constructor',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1.3,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1.3,     15.5,     0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.mgpillbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1.3,      8,      0,      0,      0,   ]
                    }
                ],
            };
exports.flankpillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
   GUNS: [ {
    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion, g.turret, g.power, g.auto, g.notdense]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion, g.turret, g.power, g.auto, g.notdense]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion, g.turret, g.power, g.auto, g.notdense]),
                    TYPE: exports.bullet,
            }, },
    ],
};
exports.flankpillbox = {
    LABEL: ' Machine Gun Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.flankpillboxTurret,
        }
    ]
};

exports.architect = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Architect',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    16,      1.3,     15.5,     0,      0,      0,   ],  
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.flankpillbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
};

exports.sniperpillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
   GUNS: [ {
 POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.sniperpillbox = {
    LABEL: ' Machine Gun Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.sniperpillboxTurret,
        }
    ]
};

exports.draftman = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'DraftsMan',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    8,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    12,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   4,    12,      1,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.sniperpillbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };

exports.trapperpillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
   GUNS: [ {
    POSITION: [  13,    8.5,     1,      0,      0,     0,     0,   ],
                        }, {
                    POSITION: [   4,    8.5,    1.7,    13,      0,     0,     0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.minion, g.turret, g.power, g.auto, g.notdense]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
    ],
};
exports.trapperpillbox = {
    LABEL: ' Machine Gun Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.trapperpillboxTurret,
        }
    ]
};

exports.programmer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Programmer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    14,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   4,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.trapperpillbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };
exports.poundpillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
   GUNS: [ {
POSITION: [  20,    12,      1,      0,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.poundpillbox = {
    LABEL: ' Machine Gun Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.poundpillboxTurret,
        }
    ]
};

exports.heavyengineer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Heavy Engineer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    14,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.poundpillbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1.3,      8,      0,      0,      0,   ]
                    }
                ],
            };
exports.pelletorpillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
   GUNS: [ {
  POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.minion, g.turret, g.power, g.auto, g.notdense]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, 
    ],
};
exports.pelletorpillbox = {
    LABEL: ' Machine Gun Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pelletorpillboxTurret,
        }
    ]
};

exports.pelletorengineer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Designer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    9,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    12,      1,     15.5,     0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 4,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.pelletorpillbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    12,      1.3,      8,      0,      0,      0,   ]
                    }
                ],
            };
exports.silo = {
            PARENT: [exports.genericTank],
            LABEL: 'Silo',
            DANGER: 6,
            BODY: {
                FOV: 1.3,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,     8,      1,      0,      0,      0,      0, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mini]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  23,     8,      1,      0,      0,      0,    0.333, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mini]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      0,      0,    0.667, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mini]),
                        TYPE: exports.bullet,
                    }, }, {
                       POSITION: [   5,    8,    -1.6,    8,      0,      0,      0,   ],
                },
            ],
        };
 exports.cannoneer = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Cannon',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     0,     0.25,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      0,     0.75,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
exports.twinrifle = {
                PARENT: [exports.genericTank],
                LABEL: 'Twin Rifle',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,    10,    1,      0,      5.5,    0,       0   ],
                }, {
                    POSITION: [  24,     7,      1,      0,      5.5,   0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.rifle, g.threequartersrof]),
                            TYPE: exports.bullet,
                        }, }, {
                     POSITION: [  20,    10,    1,      0,      -5.5,   0,      0,   ],
                        }, {
                    POSITION: [  24,     7,      1,      0,      -5.5,    0,      0.5,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.rifle, g.threequartersrof]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
exports.halfnhalf2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Half N` Half',
               BODY: {    
            FOV: 1.1,
              },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  9,     10,      1.6,      8,      0,      180,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  15,    10,     1.4,     8,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
exports.insect = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Insect',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                    TYPE: exports.bullet,
                }, }, {
                POSITION: [  18,     8,      1,      0,      0,     110,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.webber]),
                    TYPE: exports.bullet,
                }, }, {
                POSITION: [  18,     8,      1,      0,      0,      70,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.webber]),
                    TYPE: exports.bullet,
                }, }, {
                POSITION: [  21,    14,      1,      0,      0,     180,     0.5, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                    TYPE: exports.bullet,
                }, }, {
                POSITION: [  18,     8,      1,      0,      0,     250,     0.5, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.webber]),
                    TYPE: exports.bullet,
                }, }, {
                POSITION: [  18,     8,      1,      0,      0,     290,     0.5, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.webber]),
                    TYPE: exports.bullet,
                }, },
            ],
        };
exports.flankgatling = {
        PARENT: [exports.genericTank],
        LABEL: 'Double Gatling',
        BODY: {  
            FOV: 1.1,
              },
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    15,     10,     1.4,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gatling]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    15,     10,     1.4,     8,      0,     180,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gatling]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.minimach = {
            PARENT: [exports.genericTank],
            LABEL: 'Mini Machine',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.mini, g.morereload]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.mini, g.morereload]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      2,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.mini, g.morereload]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
exports.fastfire = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Fastfire',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  18,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  18,     2.5,      1,      0,    -3,     0,     0.15,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  16,     2.5,      1,      0,     3,     0,      0.3,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  16,     2.5,      1,      0,    -3,     0,     0.45,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  14,     2.5,      1,      0,     3,     0,      0.6,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  14,     2.5,      1,      0,    -3,     0,     0.75,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0.9,   ],
            }, {
            POSITION: [    9,     10,     1.4,     8,      0,      180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
                }, },
            ],
        };  
exports.guardian = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Guardian',
                STAT_NAMES: statnames.trap, 
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */      
                    POSITION: [  14,     6,      1,      0,      0,     140,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     140,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     -140,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     -140,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                       POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                         }, {
                       POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                           PROPERTIES: {
                               SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                               TYPE: exports.block,
                        }, },
                ],
            };

exports.flarebullet = {
    PARENT: [exports.bullet],
    LABEL: 'Flare',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120
    },
    GUNS: [{
        POSITION: [  18,     8,      1,      0,      0,      180,      0,   ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.flare]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }],
        }
    }]
};

  exports.flare = {
    PARENT: [exports.genericTank],
    LABEL: 'Flare',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.65,
        SPEED: base.SPEED * 0.75,
        FOV: 1.25
    },
    GUNS: [{
        POSITION: [8, 16, 1, 5, 0, 0, 0],
    }, {
        POSITION: [10, 12.5, -0.5, 9.5, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.flarer]),
            TYPE: exports.flarebullet,
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    }, {
        POSITION: [16.5, 11.5, -1.1, 0, 0, 0, 0]
    }]
};


exports.fastbullet = {
    PARENT: [exports.bullet],
    LABEL: 'Fast bullet',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120
    },
    GUNS: [{ /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     8,      1,      0,     5.5,     180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flare]),
                AUTOFIRE: true,
                TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true}]
            }, }, {
            POSITION: [  20,     8,      1,      0,    -5.5,     180,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flare]),
                 AUTOFIRE: true,
                TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true}]
            }, },
        ],
};

  exports.accelerationsh = {
    PARENT: [exports.genericTank],
    LABEL: 'Acceleration Shot',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.65,
        SPEED: base.SPEED * 0.75,
        FOV: 1.25
    },
    GUNS: [{
        POSITION: [8, 17, 1, 5, 0, 0, 0],
    }, {
      POSITION: [11, 15, 1, 5, 0, 0, 0],
    }, {
        POSITION: [10, 12.5, -0.5, 9.5, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.flarer]),
            TYPE: exports.fastbullet,
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    }, {
        POSITION: [16.5, 11.5, -1.1, 0, 0, 0, 0]
    }]
};

exports.homingbullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 8,
        RANGE: 370,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'turnWithSpeed',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    SHAPE: 6,
    MOTION_TYPE: 'swarm',
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.explosion = {
     PARENT: [exports.bullet],
    LABEL: 'Explosion',
    INDEPENDENT: true,
  BODY: {
        RANGE: 500,
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  2,     5,      1,      0,      0,    0,      0,   ], 
            PROPERTIES: {
              AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: exports.bullet,
            }, }, { 
            POSITION: [2,   5,      1,      0,      0,    72,      0,   ], 
            PROPERTIES: {
              AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: exports.bullet,
            }, }, {
           POSITION: [  2,   5,     1,      0,      0,      144,      0,   ], 
            PROPERTIES: {
              AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: exports.bullet,
            }, }, { 
            POSITION: [  2,  5,     1,      0,      0,     216,    0,   ],  
              PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: exports.bullet,
              }, }, {
            POSITION: [  2,  5,     1,      0,      0,     288 ,    0,   ],  
              PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: exports.bullet,
            }, }, 
    ],
};
exports.thinshell = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    SHAPE: -1,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 200,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.nuke = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    DIE_AT_RANGE: true,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,    12,     1,     0,      0,     0,     0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
              POSITION: [  2,    12,     1,     0,      0,     20,     0,   ], 
             PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
            }, }, {
               POSITION: [  2,    12,     1,     0,      0,     40,     0,   ], 
             PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
             }, }, { 
               POSITION: [  2,    12,     1,     0,      0,     60,     0,   ], 
             PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
             }, }, { 
               POSITION: [  2,    12,     1,     0,      0,     80,     0,   ], 
             PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
             }, }, {
                POSITION: [  2,    12,     1,     0,     0,     100,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
              POSITION: [  2,    12,     1,     0,      0,     120,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
              POSITION: [  2,    12,     1,     0,      0,     140,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
              POSITION: [  2,    12,     1,     0,      0,     160,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
                POSITION: [  2,    12,     1,     0,      0,     180,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
                POSITION: [  2,    12,     1,     0,      0,     200,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
                POSITION: [  2,    12,     1,     0,      0,     220,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
                POSITION: [  2,    12,     1,     0,      0,     240,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
                POSITION: [  2,    12,     1,     0,      0,     260,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
                POSITION: [  2,    12,     1,     0,      0,     280,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
                POSITION: [  2,    12,     1,     0,      0,     300,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
                POSITION: [  2,    12,     1,     0,      0,     320,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
                POSITION: [  2,    12,     1,     0,      0,     340,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
             }, },
           ],
};
exports.gernader = {
        PARENT: [exports.genericTank],
        LABEL: 'Grenader',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [14.5,  12,     1,       0,       0,      0,      0,   ],   
               PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lessreload]),
                TYPE: exports.nuke,
              }, },
        ],
    };     
  
exports.homingshot = {
        PARENT: [exports.genericTank],
        LABEL: 'HomingShot',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [14.5,  12,     1,       0,       0,      0,      0,   ],   
               PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.morespeed]),
                TYPE: exports.homingbullet,
                MAX_CHILDREN: 1,
              }, },
        ],
    }; 

exports.chimera = {
	PARENT: [exports.genericTank],
	LABEL: 'Chimera',
	DANGER: 7,
	GUNS: [{
		POSITION: [20, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
			TYPE: [exports.drone, {
				INDEPENDENT: true
			}],
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: false,
			MAX_CHILDREN: 3
		}
	}, {
		POSITION: [13, 8, 1, 0, 0, 180, 0]
	}, {
		POSITION: [4, 8, 1.7, 13, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
};
      

exports.rock2 = {
    LABEL: '',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -2,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 30,
        SHIELD: 30,
        REGEN: 10,
        DAMAGE: 1.2,
        RESIST: 1,
        STEALTH: 1,
        RANGE: 200
    },
    VALUE: 0,
    SIZE: 20,
    COLOR: 16,
    VARIES_IN_SIZE: false,
    GIVE_KILL_MESSAGE: false,
    ACCEPTS_SCORE: false,
    DIE_AT_RANGE: true,
    HITS_OWN_TYPE: 'never',
};
exports.sheildTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    CONTROLLERS: [],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [0.01,    20,      1,     -18,      0,      0,     0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sheild]),
            TYPE: exports.rock2,
            AUTOFIRE: true,
        },
    }, ],
};
exports.sheildTurret2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    CONTROLLERS: ['reversespin'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [0.2,    10,      1,      0,      0,      0,      0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sheild]),
            TYPE: exports.rock2,
            AUTOFIRE: true,
        },
    }, ],
};
exports.doublesheild = {
    PARENT: [exports.genericTank],
    LABEL: 'force field',
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [20, 0, 0, 270, 360, 0, ],
        TYPE: exports.sheildTurret,
    }, { POSITION: [20, 0, 0, 90, 360, 0, ],
        TYPE: exports.sheildTurret,
    },],
    GUNS: [{
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',
            STAT_CALCULATOR: 0,
            WAIT_TO_CYCLE: false,
            AUTOFIRE: false,
            SYNCS_SKILLS: false,
            MAX_CHILDREN: 0,
            ALT_FIRE: false,
            NEGATIVE_RECOIL: false,
        },
    }],
};
exports.grinder = {
        PARENT: [exports.genericTank],
        LABEL: 'Grinder',
BODY: {    
            FOV: 0.85,
              },
      
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    9,     10,     1.8,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.blaster, g.morereload]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.Hflame = {
        PARENT: [exports.genericTank],
        LABEL: 'Heavy Flamer',
BODY: {    
            FOV: 0.85,
              },
      
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [    9,     10,     1.8,     11,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.blaster, g.morereload, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    9,     10,     1.8,     7,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.blaster, g.morereload, g.halfrecoil]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.grinder3 = {
        PARENT: [exports.genericTank],
        LABEL: '',
BODY: {    
            FOV: 0.75,
              },
      
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    9.5,     12,     1.8,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.blaster, g.morereload, g.morereload]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.grinder2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Devourer',
   GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
  POSITION: [    9,     10,     1.6,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                TYPE: exports.bullet,
                   }, }, {
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
            }, },
        ],
    };
exports.falconback = {
        PARENT: [exports.genericTank],
        LABEL: 'Devourer',
   GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
  POSITION: [    9,     10,     1.6,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                TYPE: exports.bullet,
                   }, }, {
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
            }, },
        ],
    };
exports.maxim = {
        PARENT: [exports.genericTank],
        LABEL: 'Maxim Gun',
        BODY: {    
            FOV: 1.1,
              },
      
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    15,     10,     1.4,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain]),
                TYPE: exports.bullet,
            }, },
        ],
    };
  exports.pistol = {
                PARENT: [exports.genericTank],
                LABEL: 'Pistol',
                DANGER: 7,
            BODY: {    
            FOV: 0.8,
              },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  23,     7,      1,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.moredamage, g.halfrange]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
                  },
           ],
  };
 exports.musket = {
                PARENT: [exports.genericTank],
                LABEL: 'musket',
                DANGER: 7,
    BODY: {    
            FOV: 1.2,
              },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  23,     7,      1,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.moredamage, g.halfrange, g.morespeed, g.morespeed, g.morespeed, g.morespeed, g.halfrange, g.lessdamage]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
                  },
           ],
  };
exports.pistoltrapperpound = {
                PARENT: [exports.genericTank],
                LABEL: 'fast coiler',
                DANGER: 7,
  BODY: {
    FOV: 0.8,
  },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  23,     7,      1,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.morespeed, g.halfrange]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
                  }, {
                POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                       POSITION: [  20,    12,      1,      0,      0,      180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
                  }, },
           ],
  };
exports.pistoltrapper = {
                PARENT: [exports.genericTank],
                LABEL: 'Impuser',
                DANGER: 7,
  BODY: {
    FOV: 0.8,
  },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  23,     7,      1,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.morespeed, g.halfrange]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
                  }, {
                POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                  }, },
           ],
  };
exports.pistolsniper = {
                PARENT: [exports.genericTank],
                LABEL: 'sniper pistol',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  25,     7,      1,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.moredamage, g.halfrange]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
                  },
           ],
  };
exports.pistolranger = {
                PARENT: [exports.genericTank],
                LABEL: 'sharp pistol',
                DANGER: 7,
   BODY: {
    FOV: 1.2,
  },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  26,     7,      1,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.moredamage, g.halfrange]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  16,    10.5,    1,      0,      0,      0,      0,   ],
                  }, {
                    POSITION: [  13,    12,    1,      0,      0,      0,      0,   ],
                  },
           ],
  };
exports.fastpistol = {
                PARENT: [exports.genericTank],
                LABEL: 'Fast Pistol',
                DANGER: 7,
            BODY: {    
            FOV: 0.8,
              },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  23,     7,      1.2,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.halfrange, g.mach]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1.2,      0,      0,      0,      0,   ],
                  },
           ],
  };
exports.fasterpistol = {
                PARENT: [exports.genericTank],
                LABEL: 'Golden Shell',
                DANGER: 7,
            BODY: {    
            FOV: 0.8,
              },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  23,     7,      1.2,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.halfrange, g.mach, g.morespeed, g.morereload]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1.2,      0,      0,      0,      0,   ],
                  }, {
                  POSITION: [  17,    10.5,    1.2,      0,      0,      0,      0,   ],
                  },
           ],
  };
exports.pistolsniper2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Acc pistol',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  25,     7,      1,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.moredamage, g.halfrange, g.sniper]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
                  }, {
                  POSITION: [  16,    7,    1,      0,      0,      0,      0,   ],
                  },
           ],
  };
exports.pistolsnipertwin = {
                PARENT: [exports.genericTank],
                LABEL: 'block shot',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */

                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
                  }, }, {
                    POSITION: [  25,     7,      1,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.moredamage, g.halfrange]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
                  }
           ],
  };
exports.pistoltrapper2 = {
                PARENT: [exports.genericTank],
                LABEL: 'flank Impuser',
                DANGER: 7,
  BODY: {
    FOV: 0.8,
  },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  23,     7,      1,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.morespeed, g.halfrange]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
                  }, {
                POSITION: [  13,     8,      1,      0,      0,      180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                       POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                  }, },
           ],
  };
exports.muskminion
 = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: true,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
         POSITION: [4, 1.5, 1, 11, -3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
          },
    }, {
        POSITION: [4, 1.5, 1, 11, 3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        },
    }, {
        POSITION: [4, 2, 1, 13, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        },
    }, {
        POSITION: [1, 2, 1, 12, -1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        },
    }, {
        POSITION: [1, 2, 1, 11, 1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        },
    }, {
        POSITION: [15, 4, 1, 6, 3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 4, 1, 6, -3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 7, -1.3, 0, 0, 180, 0, ],
    }, {
        POSITION: [4, 12, 1.7, 17, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports.bullet,
        }, }, 
    ],
};
     
  exports.musketeer3 = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.2,
    },
    LABEL: '3 Musketeers',
    DANGER: 7,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
        POSITION: [4, 1.5, 1, 11, -3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.lessreload, g.lessreload]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [4, 1.5, 1, 11, 3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.lessreload, g.lessreload]),
            TYPE: exports.trap,
        },  }, {
        POSITION: [4, 2, 1, 13, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.lessreload, g.lessreload]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [1, 2, 1, 12, -1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.lessreload, g.lessreload]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [1, 2, 1, 11, 1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.lessreload, g.lessreload]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [15, 4, 1, 6, 3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake, g.lessreload, g.lessreload]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [15, 4, 1, 6, -3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake, g.lessreload, g.lessreload]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [15, 7, -1.3, 0, 0, 180, 0, ],
    }, {
        POSITION: [4, 12, 1.7, 17, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake, g.lessreload, g.lessreload]),
            TYPE: exports.bullet,
        }, }, {
          POSITION: [0, 20, 0, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
            TYPE: exports.muskminion,
            MAX_CHILDREN: 2,
        }, },
    ],
  };
exports.musketeer = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.2,
    },
    LABEL: 'Musketeer',
    DANGER: 7,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
        POSITION: [4, 1.5, 1, 11, -3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.lessreload, g.lessreload]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [4, 1.5, 1, 11, 3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.lessreload, g.lessreload]),
            TYPE: exports.trap,
        },  }, {
        POSITION: [4, 2, 1, 13, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.lessreload, g.lessreload]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [1, 2, 1, 12, -1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.lessreload, g.lessreload]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [1, 2, 1, 11, 1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.lessreload, g.lessreload]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [15, 4, 1, 6, 3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake, g.lessreload, g.lessreload]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [15, 4, 1, 6, -3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake, g.lessreload, g.lessreload]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [15, 7, -1.3, 0, 0, 180, 0, ],
    }, {
        POSITION: [4, 12, 1.7, 17, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake, g.lessreload, g.lessreload]),
            TYPE: exports.bullet,
        }, },
           ],
};
exports.hewngunner = {
            PARENT: [exports.genericTank],
            LABEL: 'Hewn Gunner',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  12,    3.5,     1,      0,     7.25,    45,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    -45,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
exports.ghewngunner = {
            PARENT: [exports.genericTank],
            LABEL: 'Terminator',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    8,     1,      0,     7.25,    45,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,    8,     1,      0,    -7.25,    -45,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                        TYPE: exports.bullet,
                    }, }, {
                      POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
                    }, }, 
            ],
        };
exports.musketeersideshot = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.2,
    },
    LABEL: 'Twin Musketeers',
    DANGER: 7,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
        POSITION: [4, 1.5, 1, 11, -3, 30, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [4, 1.5, 1, 11, 3, 30, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        },  }, {
        POSITION: [4, 2, 1, 13, 0, 30, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [1, 2, 1, 12, -1, 30, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [1, 2, 1, 11, 1, 30, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [15, 4, 1, 6, 3, 30, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [15, 4, 1, 6, -3, 30, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [15, 7, -1.3, 0, 0, 180, 1, ],
    }, {
        POSITION: [4, 12, 1.7, 17, 0, 30, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports.bullet,
        }, }, {
          POSITION: [4, 1.5, 1, 11, 0, -30, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [4, 1.5, 1, 11, 0, -30, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        },  }, {
        POSITION: [4, 2, 1, 13, 0, -30, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [1, 2, 1, 12, -1, -30, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [1, 2, 1, 11, 1, -30, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [15, 4, 1, 6, 3, -30, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [15, 4, 1, 6, -3, -30, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [15, 7, -1.3, 0, 0, 180, 0, ],
    }, {
        POSITION: [4, 12, 1.7, 17, 0, -30, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports.bullet,
        }, },
           ],
};
     exports.heavyrifle = {
            PARENT: [exports.genericTank],
            LABEL: 'Carbine',
            BODY: {
              FOV: 1.225,
            },
            DANGER: 7,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    14.5,    1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [  24,     10.5,      1,      0,      0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.pound]),
                            TYPE: exports.bullet,
                        }, },
            
            ],
        };
 exports.sparrow = {
            PARENT: [exports.genericTank],
            LABEL: 'Sparrow',
            DANGER: 7,
            BODY: {
                ACCELERATION: base.ACCEL * 0.8,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                POSITION: [   5,    8.5,   -1.6,     8,      0,      0,      0,   ],
                    }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        };
 exports.pentaguard = {
            PARENT: [exports.genericTank],
            LABEL: 'Penta Guard',
            DANGER: 7,
            BODY: {
                ACCELERATION: base.ACCEL * 0.8,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.bullet,
        }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        };
 exports.raven = {
            PARENT: [exports.genericTank],
            LABEL: 'Raven',
            DANGER: 7,
            BODY: {
                ACCELERATION: base.ACCEL * 0.8,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        };
 exports.eagle = {
                PARENT: [exports.genericTank],
                LABEL: 'Eagle',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
 exports.railgun = {
            PARENT: [exports.genericTank],
            LABEL: 'Railgun',
           BODY: {
                    FOV: 1.2,
                },
            GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  1,     8,      1,      10,     0,      0,      0, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.bitlessspeed, g.bitlessspeed, g.bitlessspeed, g.bitlessspeed, g.bitlessspeed, g.halfrange]),
                    TYPE: exports.bullet,
                }, }, { 
                POSITION: [  1,     8,      1,      15,     0,      0,      0, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.halfrange]),
                    TYPE: exports.bullet,
                }, }, { 
                POSITION: [  1,     8,      1,      20,     0,      0,      0, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morespeed, g.halfrange]),
                    TYPE: exports.bullet,
                }, }, { 
                POSITION: [  1,     8,      1,      25,     0,      0,      0, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morespeed, g.morespeed, g.halfrange]),
                    TYPE: exports.bullet,
                }, }, { 
                POSITION: [  27,    2,      1,      0,      4,      0,      0, ],
                }, { 
                POSITION: [  27,    2,      1,      0,      -4,     0,      0, ],
                },
              ],
        };
exports.bot = {
    AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
    BODY: {
        SIZE: 10,
    },
      SKILL: skillSet({
        rld: 1,
        dam: 1, 
        pen: 1,
        str: 1,
        spd: 1,
        atk: 0,
        hlt: 1,
        shi: 0,
        rgn: 0,
        mob: 0,       
    }),
    //COLOR: 17,
    NAME: "ai_",
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion'
    ],
    AI: { STRAFE: true, },
};
exports.test = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
   SKILL: skillSet({
        rld: 1,
        dam: 1, 
        pen: 1,
        str: 1,
        spd: 1,
        atk: 0,
        hlt: 0,
        shi: 0,
        rgn: 0,
        mob: 0,       
    }),
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
exports.beem = {
    LABEL: 'beem',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    SHAPE: -1,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.lazer = {
    PARENT: [exports.genericTank],
    LABEL: 'lazer',
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.lazer, g.morespeed, g.morespeed, g.halfrange]),
            TYPE: exports.beem,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};

exports.thrusterstuff = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: false,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
           POSITION: [10, 15, 1.5, 9, 0, 180, 7.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.heatseekmach,]),
                TYPE: exports.bullet,
              LABEL: gunCalcNames.thruster,
            }, },
    ],
};
exports.thruster2 = {
    LABEL: 'Auto-Bullet',
    PARENT: [exports.bullet],
    CONTROLLERS: ['nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      180,     360,  1],
            TYPE: exports.thrusterstuff,
            ALT_FIRE: true,
        }
    ]
};
 exports.thrustshot = {
                PARENT: [exports.genericTank],
                LABEL: 'Thrust Shot',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    11,    -0.5,    14,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  21,    12,    -1.1,     0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind]),
                            TYPE: exports.thruster2,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };

 
exports.pillbullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 8,
        RANGE: 370,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'turnWithSpeed',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    SHAPE: 0,
    MOTION_TYPE: 'swarm',
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
    GUNS: [],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pillboxTurret,
             SHOOT_SETTINGS: combineStats([g.minion, g.turret, g.aimmissile]),
             FACING_TYPE: ['toTarget'], // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
             MOTION_TYPE: 'swarm',
             DRAW_HEALTH: true,
             ALT_FIRE: true,
             INDEPENDENT: false,
             STAT_CALCULATOR: gunCalcNames.sustained,
              },
       ],
};

exports.test2= {
    PARENT: [exports.genericTank],
    LABEL: 'Test2',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.pillbullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
exports.bulleter = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Bulleter',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     3.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
              }, }, {
            POSITION: [  17,     3.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
              POSITION: [  19,     3.5,      1,      0,     0,     1,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
                }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, 
      ],
};

// NPCS:
exports.crasher = {
    TYPE: 'crasher',
    LABEL: 'Crasher',
    COLOR: 5,
    SHAPE: 3,
    SIZE: 5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
},
exports.sentry = {
    PARENT: [exports.genericTank],
    TYPE: 'crasher',
    LABEL: 'Sentry',
    DANGER: 3,
    COLOR: 5,
    SHAPE: 3,
    SIZE: 10,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 0.5,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
},
exports.trapTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'], 
    COLOR: 16,
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,    14,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,    14,     1.8,    16,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowpower, g.fast, g.halfreload]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
    ],
},
exports.sentrySwarm = {
    PARENT: [exports.sentry],
    DANGER: 3,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
},
exports.sentryGun = makeAuto(exports.sentry, 'Sentry', { type: exports.heavy3gun, size: 12, }),
exports.sentryTrap = makeAuto(exports.sentry, 'Sentry', { type: exports.trapTurret, size: 12, }),

  exports.ultimateminiboss = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.3,
        dam: 4, 
        pen: 10,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 200,
        shi: 1,
        rgn: 1,
        mob: 0,        
    }),
    LEVEL: 150,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A Boss has fallen',
},
  exports.ulitmate = {
        PARENT: [exports.ultimateminiboss],
        LABEL: 'Ultimate',
        COLOR: 5,
        SHAPE: 6,
        SIZE: 70,
        VARIES_IN_SIZE: true,
        VALUE: 250000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.25,
            HEALTH: base.HEALTH * 5,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 4,
        },
    },
  
exports.bigtriauto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     5,      1,      0,    -4.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
              POSITION: [  14,     5,      1,      0,    -4.5,     120,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     120,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      120,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
              POSITION: [  14,     5,      1,      0,    -4.5,    240,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,    240,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,     240,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
exports.autocrasherSpawner = {
        PARENT: [exports.genericTank],
        LABEL: 'AutoSpawned',  
        STAT_NAMES: statnames.drone,
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 5, 
        INDEPENDENT: true, 
        AI: { chase: true, },
        MAX_CHILDREN:8,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.pound, g.lessreload, g.lessreload]),
                    TYPE: [exports.autoswarm, { LABEL: 'Crasher', VARIES_IN_SIZE: true, DRAW_HEALTH: true }],
                    SYNCS_SKILLS: true,
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.swarm,
                }, },
        ],
    };
 exports.ulitmate_destroyer = {
            PARENT: [exports.ulitmate],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    7,    11,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.morereload, g.morereload]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    7,    11,     1,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.morereload, g.morereload]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    7,    11,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.morereload, g.morereload]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   2,     8,     1.7,    11,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,      120,     0,   ],
                    }, {
                POSITION: [   2,     8,     1.7,    11,      0,      120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,      240,     0,   ],
                    }, {
                POSITION: [   2,     8,     1.7,    11,      0,      240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,

                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.autocrasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.autocrasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.autocrasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigtriauto4gun, { INDEPENDENT: true, COLOR: 5,  }],
                    }, 
            ],
        },

exports.miniboss = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,       
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A visitor has fallen',
},
    exports.crasherSpawner = {
        PARENT: [exports.genericTank],
        LABEL: 'Spawned',  
        STAT_NAMES: statnames.drone,
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 5, 
        INDEPENDENT: true, 
        AI: { chase: true, },
        MAX_CHILDREN: 4,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone]),
                    TYPE: [exports.drone, { LABEL: 'Crasher', VARIES_IN_SIZE: true, DRAW_HEALTH: true }],
                    SYNCS_SKILLS: true,
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.summoner = {
        PARENT: [exports.miniboss],
        LABEL: 'Summoner',
        SHAPE: 4,
        COLOR: 13,
        SIZE: 36,
        LEVEL: 1,
        MAX_CHILDREN: 48,
        FACING_TYPE: 'autospin',
        VARIES_IN_SIZE: true,
        VALUE: 300000,
        BODY: {
            FOV: 1.5,
            SPEED: base.SPEED * 0.075,
            HEALTH: base.HEALTH * 13,
            SHIELD: base.SHIELD,
            REGEN: base.REGEN * 0.5,
            DAMAGE: base.DAMAGE * 2.5,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.summoner]),
                    TYPE: exports.sunchip,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.necro,
                }, }, {
            POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.summoner]),
                    TYPE: exports.sunchip,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.necro,
                }, }, {
            POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.summoner]),
                    TYPE: exports.autosunchip,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    MAX_CHILDREN: 4,
                    STAT_CALCULATOR: gunCalcNames.necro,
                    LABEL: 'Guard',
                }, }, {
            POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.summoner]),
                    TYPE: exports.autosunchip,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    MAX_CHILDREN: 4,
                    STAT_CALCULATOR: gunCalcNames.necro,
                    LABEL: 'Guard',
                }, },
            ],
    };
    exports.skimboss = {
        PARENT: [exports.miniboss],
        LABEL: 'Elite Skimmer',
        SHAPE: 3,
        COLOR: 2,
        SIZE: 30,
        FACING_TYPE: 'autospin',
        VARIES_IN_SIZE: true,
        VALUE: 250000,
        BODY: {
            FOV: 1.5,
            SPEED: base.SPEED * 0.1,
            HEALTH: base.HEALTH * 12,
            SHIELD: base.SHIELD,
            REGEN: base.REGEN * 0.5,
            DAMAGE: base.DAMAGE * 2.5,
        },
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  15,     5,      0,     60,     170, 0],
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     180,    170, 0],
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     300,    170, 0],
                TYPE: exports.skimturret,
                    },
        ],
    };
    exports.defender = {
            PARENT: [exports.miniboss],
            LABEL: 'Defender',
            COLOR: 2,
            SHAPE: 3,
            SIZE: 50,
            VARIES_IN_SIZE: true,
            VALUE: 150000,
            BODY: {
                FOV: 1.3,
                SPEED: base.SPEED * 0.25,
                HEALTH: base.HEALTH * 1.5,
                SHIELD: base.SHIELD * 1.25,
                REGEN: base.REGEN,
                DAMAGE: base.DAMAGE * 2.5,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  13,     8,      1,      0,      0,      60,     0,   ],
                  }, {
                POSITION: [   4,     8,     1.7,    13,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,      180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
               POSITION: [  13,     8,      1,      0,      0,      300,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      300,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  7,     6.5,     0,      0,     360,   1, ],  
                    TYPE: [exports.bigauto3gun, { INDEPENDENT: true, COLOR: 2,  }]
            }, {
                POSITION: [  7,     6.5,     0,     120,    360,   1, ],  
                    TYPE: [exports.bigauto3gun, { INDEPENDENT: true, COLOR: 2,  }]
            }, {
                POSITION: [  7,     6.5,     0,     240,     360,   1, ],  
                    TYPE: [exports.bigauto3gun, { INDEPENDENT: true, COLOR: 2,  }]
                    }, 
            ],
        },

    exports.elite = {
        PARENT: [exports.miniboss],
        LABEL: 'Elite Crasher',
        COLOR: 5,
        SHAPE: 3,
        SIZE: 50,
        VARIES_IN_SIZE: true,
        VALUE: 150000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.25,
            HEALTH: base.HEALTH * 1.5,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5,
        },
    },
        exports.elite_destroyer = {
            PARENT: [exports.elite],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    5,    16,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.morereload, g.morereload]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.morereload, g.morereload]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.morereload, g.morereload]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto4gun, { INDEPENDENT: true, COLOR: 5,  }]
                    }, 
            ],
        },
        exports.elite_gunner = {
            PARENT: [exports.elite],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  14,    16,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,    16,     1.5,    14,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                        TYPE: [exports.pillbox, { INDEPENDENT: true, }],
                    }, }, {                
                POSITION: [   6,    14,     -2,      2,      0,      60,     0,   ],
                    }, {                
                POSITION: [   6,    14,     -2,      2,      0,     300,     0,   ],
                    }
            ],
            AI: { NO_LEAD: false, },
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     8,      0,     60,     180,   0, ], 
                    TYPE: [exports.auto4gun],
                    }, {
                POSITION: [  14,     8,      0,     300,    180,   0, ],
                    TYPE: [exports.auto4gun],
            }],
        },
        exports.elite_sprayer = { 
            PARENT: [exports.elite],
            AI: { NO_LEAD: false, },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,      60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        },
            ],
        },

    exports.palisade = (() => {
        let props = {
            SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.halfreload, g.halfreload]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,                        
            AUTOFIRE: true,
            MAX_CHILDREN: 1,
            SYNCS_SKILLS: true,   
            WAIT_TO_CYCLE: true,
        };
        return {
            PARENT: [exports.miniboss],
            LABEL: 'Rogue Palisade',
            COLOR: 17,
            SHAPE: 6,
            SIZE: 60,
            VALUE: 500000,
            BODY: {
                FOV: 1.3,
                SPEED: base.SPEED * 0.1,
                HEALTH: base.HEALTH * 2,
                SHIELD: base.SHIELD * 2,
                REGEN: base.REGEN,
                DAMAGE: base.DAMAGE * 3,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,      6,    -1.6,     8,      0,      0,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     60,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     120,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,                        
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true, 
                        WAIT_TO_CYCLE: true,  
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     240,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     300,     0,   ], 
                    PROPERTIES: props, },
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,    10,      0,      30,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,      90,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     150,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     210,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     270,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     330,    110, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
    })(),
      exports.sailor3 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Lancher',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [7,    7.5,    0.6,     5.5,      4,      25,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     5.5,     -4,      -25,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
               POSITION: [8,     16,     1,     5,     0,    0,    0],
    }, {
        POSITION: [10,    12.5,    -0.5,    9.5,    0, 0,    0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.flarer]),
            TYPE: exports.flarebullet,
            STAT_CALCULATOR: gunCalcNames.sustained
    }, }, {
        POSITION: [16.5,    11.5,    -1.1,    0,    0,    0,    0]
                },
            ],
        };
// TANK UPGRADES

exports.testbed.UPGRADES_TIER_1 = [exports.basic, exports.shotgun3, exports.gernader, exports.ayao, exports.doublesheild, exports.test, exports.lazer, exports.test2, exports.railgun3, exports.quadabasic, exports.srifle, exports.trpnade2, exports.trpnade3, exports.trpnade4, exports.trpnade8, exports.palisade, exports.nadethrower3];
    exports.palisade.UPGRADES_TIER_1 = [exports.elite, exports.sentry, exports.defender, exports.summoner]
        exports.elite.UPGRADES_TIER_1 = [exports.elite_destroyer, exports.elite_gunner, exports.elite_sprayer, exports.skimboss, exports.ulitmate_destroyer];
        exports.sentry.UPGRADES_TIER_1 = [exports.sentrySwarm, exports.sentryGun, exports.sentryTrap];

exports.basic.UPGRADES_TIER_1 = [exports.twin, exports.sniper, exports.machine, exports.flank, exports.pound, exports.shield, exports.pelletor, exports.director, exports.flare, exports.pistol];
        exports.basic.UPGRADES_TIER_2 = [exports.smash, exports.single];
        exports.single.UPGRADES_TIER_3 = [exports.gsingle, exports.autosin, exports.hybirdsin]; 
        exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash, exports.weirdspike, exports.landmine];
                        exports.megasmash.UPGRADES_TIER_4 = [exports.megamine];
                        exports.landmine.UPGRADES_TIER_4 = [exports.megamine];

    exports.shotgun1.UPGRADES_TIER_2 = [];

    exports.pistol.UPGRADES_TIER_2 = [exports.pistoltrapper, exports.pistolsniper, exports.fastpistol, exports.nadethrower, exports.nadethrower2];
        exports.pistolsniper.UPGRADES_TIER_3 = [exports.pistolranger, exports.pistolsniper2, exports.pistolsnipertwin,  exports.musket];
        exports.pistoltrapper.UPGRADES_TIER_3 = [exports.pistoltrapper2, exports.pistoltrapperpound];
        exports.fastpistol.UPGRADES_TIER_3 = [exports.fasterpistol];

    exports.flare.UPGRADES_TIER_2 = [exports.accelerationsh, exports.basic4, exports.skimmer3, exports.nadethrower];
        exports.accelerationsh.UPGRADES_TIER_3 = [exports.skimmer, exports.rocketeer, exports.fightershot,  exports.thrustshot, exports.sailor3];
        exports.basic4.UPGRADES_TIER_3 = [exports.basic3, exports.abasic, exports.homingshot,];
        exports.skimmer3.UPGRADES_TIER_3 = [exports.skimmer2,];

    exports.pelletor.UPGRADES_TIER_2 = [exports.pellettriptwin, exports.sailor, exports.bore, exports.puntgun, exports.hewnpelletor, exports.gunner, exports.bulleter];
        exports.bore.UPGRADES_TIER_3 = [exports.gunbore, exports.mbore, exports.commando, exports.hybore, exports.nailgun, exports.bore2];
        exports.puntgun.UPGRADES_TIER_3 = [exports.puntgunmini, exports.puntgunnner, exports.autopuntgun, exports.puntgunlong, exports.puntgun2, exports.fastfire];
        exports.pelletor.UPGRADES_TIER_3 = [exports.overgunner];
        exports.hewnpelletor.UPGRADES_TIER_3 = [exports.heptashot, exports.doublehewn, exports.gsplit, exports.split, exports.hewngunner, exports.ghewngunner];
        exports.pellettriptwin.UPGRADES_TIER_3 = [exports.pelletquintuplet, exports.pellettriptwin2, exports.pellettriptwin3, exports.pellettriptwin4];
        exports.sailor.UPGRADES_TIER_3 = [exports.sailorpunt, exports.sailortrap, exports.sailorxl, exports.sailor2, exports.gunnshi, exports.sailor3, exports.sailor4];
        exports.bulleter.UPGRADES_TIER_3 = [exports.warlord, exports.nailgun, exports.pellettriptwin3];

    exports.pound.UPGRADES_TIER_2 = [exports.destroy, exports.flankpound, exports.autopound, exports.artillery, exports.multer, exports.heavymachine];
        exports.destroy.UPGRADES_TIER_3 = [exports.anni, exports.hybrid, exports.shotgun2, exports.hiveshooter, exports.autodestroy, exports.rocketeer, exports.fightershot, exports.skimmer,  exports.skimmer2, exports.harrower, exports.missilet, exports.greifer, exports.manowar];
        exports.flankpound.UPGRADES_TIER_3 = [exports.conq, exports.heavy3, exports.autoflankp, exports.titan, exports.tripound, exports.poundangle, exports.hexapound];
        exports.autopound.UPGRADES_TIER_3 = [exports.autoflankp, exports.heavy3, exports.autodestroy];
        exports.pound.UPGRADES_TIER_3 = [exports.hotshot, exports.divergent]; 
        exports.multer.UPGRADES_TIER_3 = [exports.bigsniper, exports.Deleter, exports.flankmulter, exports.multer2, exports.multer3];

    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.gunner, exports.hexa, exports.triple];
        exports.twin.UPGRADES_TIER_3 = [exports.bentboomer, exports.twinsnipe, exports.twintrap, exports.ghewngunner];
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.split, exports.autodouble, exports.bentdouble];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.spread, exports.benthybrid, exports.bentdouble, exports.bentmachine, exports.seek];
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.nailgun, exports.auto4, exports.machinegunner, exports.gmissile, exports.hybridgunn, exports.battery, exports.gunnerflank, exports.hewngunner, exports.gunbore];
        exports.triple.UPGRADES_TIER_2 = [exports.quint, exports.tripleangle, exports.puntgunmini];

    exports.shield.UPGRADES_TIER_2 = [exports.builder, exports.flanktrap, exports.tritrapper2, exports.boomer,  exports.lilengineer, exports.musketeer];
        exports.shield.UPGRADES_TIER_3 = [exports.starshoot];
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder, exports.engineer, exports.quadtrapper, exports.minitrap, exports.conq, exports.shield3, exports.twintrap, exports.gladiator, exports.protector, exports.alphacon, exports.guardian];
        exports.boomer.UPGRADES_TIER_3 = [exports.bentboomer, exports.boomertrap, exports.boomer3, exports.heavyboomer];
        exports.lilengineer.UPGRADES_TIER_3 = [exports.engineer, exports.builder2, exports.constructor2, exports.architect, exports.draftman, exports.programmer, exports.heavyengineer, exports.pelletorengineer];
        exports.tritrapper2.UPGRADES_TIER_3 = [exports.hexatrap, exports.tritrap, exports.quadtrapper, exports.minitrap, exports.twintrap, exports.fortress, exports.fortress2];
        exports.musketeer.UPGRADES_TIER_3 = [exports.musketeer3, exports.shield3, exports.musketeersideshot];

    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.hunter, exports.mini, exports.rifle, exports.sniper3, exports.snipertriple, exports.bore2, exports.silo, exports.railgun];
        exports.sniper.UPGRADES_TIER_3 = [exports.bushwhack, exports.twinsnipe, exports.seek];
        exports.assassin.UPGRADES_TIER_3 = [exports.ranger, exports.falcon, exports.autoass, exports.hybridassa, exports.stalker, exports.hunter3];
        exports.hunter.UPGRADES_TIER_3 = [exports.overhunt, exports.preda, exports.poach, exports.sidewind, exports.huntertrap, exports.hunter3, exports.hunter4];
        exports.rifle.UPGRADES_TIER_3 = [exports.rifle2, exports.hybirdrif, exports.stalker, exports.rifletrap, exports.assapellet, exports.spreadsnipe, exports.twinrifle, exports.heavyrifle, exports.unnamed];

    exports.machine.UPGRADES_TIER_2 = [exports.artillery, exports.mini, exports.gunner, exports.gatling, exports.twinmachine,exports.blaster, exports.machineflank, exports.automachine, exports.puntgun, exports.assult, exports.heavymachine];
        exports.machine.UPGRADES_TIER_3 = [exports.spray];
        exports.heavymachine.UPGRADES_TIER_3 = [exports.heavymachine2, exports.heavymachine3];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spread, exports.AutoArt, exports.general, exports.spreadsnipe, exports.artcrusier, exports.gsplit,  exports.cannoneer, exports.artillerymg];
        exports.mini.UPGRADES_TIER_3 = [exports.stream, exports.nailgun, exports.hybridmini, exports.minitrap, exports.automini, exports.hotshot, exports.puntgunlong, exports.silo, exports.minimach, exports.miniflank, exports.railgun];
        exports.gatling.UPGRADES_TIER_3 = [exports.Splasher, exports.halfnhalf, exports.gatlingaccel, exports.halfnhalf2, exports.flankgatling, exports.maxim];
        exports.twinmachine.UPGRADES_TIER_3 = [exports.bentmachine, exports.mach3, exports.machinetri];
        exports.blaster.UPGRADES_TIER_3 = [exports.blastertwin, exports.halfnhalf2, exports.bentmachine, exports.grinder, exports.grinder2];
            exports.grinder.UPGRADES_TIER_4 = [exports.grinder3, exports.Hflame]
        exports.automachine.UPGRADES_TIER_3 = [ exports.automgflank];
        exports.machineflank.UPGRADES_TIER_3 = [exports.machinetri, exports.automgflank];

    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flanktrap, exports.flankpound, exports.machineflank, exports.tritrapper2, exports.raven];
        exports.tri.UPGRADES_TIER_3 = [exports.fighter, exports.booster, exports.falcon, exports.bomber, exports.autotri, exports.surfer, exports.tripleangle, exports.twinangle, exports.poundangle, exports.missilet, exports.manowar];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo, exports.hexatrap,  exports.hurricane, exports.hexapound];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3, exports.auto4, exports.sniper3, exports.tritrap, exports.banshee, exports.gbasic, exports.mach3];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.bushwhack, exports.guntrap, exports.fortress, exports.bomber, exports.conq, exports.autoflankt, exports.huntertrap, exports.commando, exports.puntgunlong, exports.rifletrap, exports.boomertrap];
        exports.raven.UPGRADES_TIER_3 = [exports.falcon, exports.eagle, exports.pentaguard, exports.sparrow, exports.grinder2, exports.sailor4];

    exports.director.UPGRADES_TIER_2 = [exports.overseer, exports.cruiser, exports.underseer, exports.lilfact];
        exports.director.UPGRADES_TIER_3 = [exports.director2];
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.overtrap, exports.overgunner, exports.autoover, exports.overdrive, exports.banshee, exports.overhunt]; 
            exports.overlord.UPGRADES_TIER_4 = [exports.overworker];
            exports.overdrive.UPGRADES_TIER_4 = [exports.overworker];
        exports.underseer.UPGRADES_TIER_3 = [exports.necromancer];
        exports.cruiser.UPGRADES_TIER_3 = [exports.carrier, exports.battleship, exports.fortress, exports.surfer, exports.autocruiser, exports.gmissile, exports.gladiator, exports.titan, exports.invader, exports.artcrusier, exports.warlord];
        exports.lilfact.UPGRADES_TIER_3 = [exports.factory, exports.autolil, exports.snipefact, exports.twinfact, exports.Poundfact, exports.machinefact, exports.trapperfact, exports.flankfact, exports.pelletorfact, exports.dronefact];