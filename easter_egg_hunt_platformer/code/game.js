
class Level {
    constructor(plan) {
        this.plan = plan;
        let rows = plan.trim().split("\n").map(l => [...l]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.startActors = [];
        
        this.rows = rows.map((row, y) => {
            return row.map((ch, x) => {
                let type = levelChars[ch];
                if (typeof type == "string") return type;
                this.startActors.push(
                    type.create(new Vec(x, y), ch));
                return "empty";
            });
        });
    }
}

function sfx(querySelector){
    document.querySelector(querySelector).pause();
    document.querySelector(querySelector).currentTime = 0;
    document.querySelector(querySelector).play();
}

class State {
    constructor(level, actors, status, glassesFound) {
        this.level = level;
        this.actors = actors;
        this.status = status;
        this.glassesFound = glassesFound;
    }

    static start(level) {
        return new State(level, level.startActors, "playing", this.glasses);
    }

    get player() {
        return this.actors.find(a => a.type == "player");
    }
}

class Vec {
    constructor(x, y) {
        this.x = x; this.y = y;
    }
    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }
    times(factor) {
        return new Vec(this.x * factor, this.y * factor);
    }
}

class Player {
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
    }

    get type() { return "player"; }

    static create(pos) {
        return new Player(pos.plus(new Vec(0, -0.5)),
            new Vec(0, 0));
    }
}

Player.prototype.size = new Vec(0.5, 1.5);

class Lava {
    constructor(pos, speed, reset) {
        this.pos = pos;
        this.speed = speed;
        this.reset = reset;
    }

    get type() { return "lava"; }

    static create(pos, ch) {
        if (ch == "=") {
            return new Lava(pos, new Vec(2, 0));
        } else if (ch == "|") {
            return new Lava(pos, new Vec(0, 2));
        } else if (ch == "v") {
            return new Lava(pos, new Vec(0, 3), pos);
        }
    }
}

Lava.prototype.size = new Vec(1, 1);

class Teleport {
    constructor(direction) {
        this.direction = direction;
    }

    get type() { return "teleport_" + this.direction; }

    static create(ch) {
        if (ch == ">") {
            return new Teleport("forward", new Vec(2, 0));
        } else if (ch == "<") {
            return new Teleport("backward", new Vec(2, 0));
        }
    }
}

Teleport.prototype.size = new Vec(1, 1);

class Block {
    constructor(pos, visible, ch) {
        this.pos = pos;
        this.visible = visible;
        this.ch = ch;
    }

    get type() { return this.visible;}

    static create(pos, ch) {
        if (ch=="#"){
            return new Block(pos, "wall", ch);
        } else if (ch == "x"){
            return new Block(pos, "invisible_wall", ch);
        }
        
    }
}

Block.prototype.size = new Vec(1, 1);

class Coin {
    constructor(pos, basePos, wobble, ch) {
        this.pos = pos;
        this.basePos = basePos;
        this.wobble = wobble;
        this.ch = ch;
    }

    get type() { return "coin"; }

    static create(pos, ch) {
        let basePos = pos.plus(new Vec(0.2, 0.1));
        return new Coin(basePos, basePos,
            Math.random() * Math.PI * 2, ch);
    }
}

Coin.prototype.size = new Vec(0.6, 0.6);

class Glasses {
    constructor(pos, basePos, wobble, ch) {
        this.pos = pos;
        this.basePos = basePos;
        this.wobble = wobble;
        this.ch = ch;
    }

    get type() { return "glasses"; }

    static create(pos, ch) {
        let basePos = pos.plus(new Vec(0.2, 0.1));
        return new Glasses(basePos, basePos,
            Math.random() * Math.PI * 2, ch);
    }
}

Glasses.prototype.size = new Vec(1, 0.6);

const levelChars = {
    ".": "empty", "#": "wall", "^": "pad", "+": "lava", "x": Block,
    "$": "player_left", "%": "player_right", "@": Player, "o": Glasses, 
    "1": Coin, "2": Coin, "3": Coin, "4": Coin, "5": Coin, "6": Coin, "7": Coin, "8": Coin, "9": Coin,
    "=": Lava, "|": Lava, "v": Lava,
    ">": "teleport_forward", "<": "teleport_backward"
};

function elt(name, attrs, ...children) {
    let dom = document.createElement(name);
    for (let attr of Object.keys(attrs)) {
        dom.setAttribute(attr, attrs[attr]);
    }
    for (let child of children) {
        dom.appendChild(child);
    }
    return dom;
}

class DOMDisplay {
    constructor(parent, level) {
        this.dom = elt("div", { class: "game" }, drawGrid(level));
        this.actorLayer = null;
        parent.appendChild(this.dom);
    }

    clear() { this.dom.remove(); }
}

const scale = 20;

function drawGrid(level) {
    return elt("table", {
        class: "background",
        style: `width: ${level.width * scale}px`
    }, ...level.rows.map(row =>
        elt("tr", { style: `height: ${scale}px` },
            ...row.map(type => elt("td", { class: type })))
    ));
}

function drawActors(actors) {
    return elt("div", {}, ...actors.map(actor => {
        let rect = elt("div", { class: `actor ${actor.type}` });
        rect.style.width = `${actor.size.x * scale}px`;
        rect.style.height = `${actor.size.y * scale}px`;
        rect.style.left = `${actor.pos.x * scale}px`;
        rect.style.top = `${actor.pos.y * scale}px`;
        return rect;
    }));
}

DOMDisplay.prototype.syncState = function (state) {
    if (this.actorLayer) this.actorLayer.remove();
    this.actorLayer = drawActors(state.actors);
    this.dom.appendChild(this.actorLayer);
    this.dom.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
};

DOMDisplay.prototype.scrollPlayerIntoView = function (state) {
    let width = this.dom.clientWidth;
    let height = this.dom.clientHeight;
    let margin = width / 3;

    // The viewport
    let left = this.dom.scrollLeft, right = left + width;
    let top = this.dom.scrollTop, bottom = top + height;

    let player = state.player;
    let center = player.pos.plus(player.size.times(0.5))
        .times(scale);

    if (center.x < left + margin) {
        this.dom.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
        this.dom.scrollLeft = center.x + margin - width;
    }
    if (center.y < top + margin) {
        this.dom.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
        this.dom.scrollTop = center.y + margin - height;
    }
};

Level.prototype.touches = function (pos, size, type) {
    let xStart = Math.floor(pos.x);
    let xEnd = Math.ceil(pos.x + size.x);
    let yStart = Math.floor(pos.y);
    let yEnd = Math.ceil(pos.y + size.y);

    for (let y = yStart; y < yEnd; y++) {
        for (let x = xStart; x < xEnd; x++) {
            let isOutside = x < 0 || x >= this.width ||
                y < 0 || y >= this.height;
            let here = isOutside ? "wall"||"pad" : this.rows[y][x];
            if (here == type) return true;
        }
    }
    return false;
};

State.prototype.update = function (time, keys) {
    let actors = this.actors
        .map(actor => actor.update(time, this, keys));
    let newState = new State(this.level, actors, this.status, this.glassesFound);

    if (newState.status != "playing") return newState;

    let player = newState.player;
    if (this.level.touches(player.pos, player.size, "lava")) {
        sfx("#lava")
        return new State(this.level, actors, "lost", this.glassesFound);
    }

    if (this.level.touches(player.pos, player.size, "teleport_forward")) {
        sfx("#teleport")
        return new State(this.level, actors, "teleport_forward", this.glassesFound);
    }

    if (this.level.touches(player.pos, player.size, "teleport_backward", this.glassesFound)) {
        sfx("#teleport")
        return new State(this.level, actors, "teleport_backward", this.glassesFound);
    }

    for (let actor of actors) {
        if (actor != player && overlap(actor, player)) {
            newState = actor.collide(newState);
        }
    }
    return newState;
};

function overlap(actor1, actor2) {
    return actor1.pos.x + actor1.size.x > actor2.pos.x &&
        actor1.pos.x < actor2.pos.x + actor2.size.x &&
        actor1.pos.y + actor1.size.y > actor2.pos.y &&
        actor1.pos.y < actor2.pos.y + actor2.size.y;
}

Lava.prototype.collide = function (state) {
    sfx("#lava")
    return new State(state.level, state.actors, "lost", state.glassesFound);
};

Teleport.prototype.collide = function (state) {
    return new State(state.level, state.actors, "playing", state.glassesFound);
};

Block.prototype.collide = function (state) {
    return new State(state.level, state.actors, "playing", state.glassesFound);
};

Teleport.prototype.update = function () {
};

Coin.prototype.collide = function (state) {
    sfx("#coin");
    let filtered = state.actors.filter(a => a != this);
    let status = state.status;
    state.level.plan  = state.level.plan.replace(this.ch, ".");

    updateScore()

    return new State(state.level, filtered, status, state.glassesFound);
};

function updateScore() {
    scorebox = document.getElementById("score")
    scoreElements = scorebox.innerHTML.split(" / ");
    currentScore = parseInt(scoreElements[0])
    totalScore = parseInt(scoreElements[1])
    currentScore = currentScore + 1
    scorebox.innerHTML = currentScore + " / " + totalScore
}

Glasses.prototype.collide = function (state) {
    sfx("#glasses")
    for (let i = 0; i < state.actors.length; i++){
        if (state.actors[i].type == "invisible_wall"){
            state.actors[i] = new Block(state.actors[i].pos, "wall")
        }
    }
    let filtered = state.actors.filter(a => a.type != this.type);
    state.level.plan  = state.level.plan.replace(this.ch, ".");
    state.level.plan  = state.level.plan.replaceAll("x", "#");

    let level = new Level(state.level.plan)

    return new State(level, filtered, state.status, true);
};

Lava.prototype.update = function (time, state) {
    let newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")&&!state.level.touches(newPos, this.size, "pad")) {
        return new Lava(newPos, this.speed, this.reset);
    } else if (this.reset) {
        return new Lava(this.reset, this.speed, this.reset);
    } else {
        return new Lava(this.pos, this.speed.times(-1));
    }
};

const wobbleSpeed = 8, wobbleDist = 0.07;

Coin.prototype.update = function (time) {
    let wobble = this.wobble + time * wobbleSpeed;
    let wobblePos = Math.sin(wobble) * wobbleDist;
    return new Coin(this.basePos.plus(new Vec(0, wobblePos)),
        this.basePos, wobble, this.ch);
};

Block.prototype.update = function (time) {
    return new Block(this.pos, this.visible, this.ch);
};

Glasses.prototype.update = function (time) {
    let wobble = this.wobble + time * wobbleSpeed;
    let wobblePos = Math.sin(wobble) * wobbleDist;
    return new Glasses(this.basePos.plus(new Vec(0, wobblePos)),
        this.basePos, wobble, this.ch);
};

const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

Player.prototype.update = function (time, state, keys) {
    let xSpeed = 0;
    if (keys.ArrowLeft | keys.a) xSpeed -= playerXSpeed;
    if (keys.ArrowRight | keys.d) xSpeed += playerXSpeed;
    let pos = this.pos;
    let movedX = pos.plus(new Vec(xSpeed * time, 0));
    if (!state.level.touches(movedX, this.size, "wall")&&!state.level.touches(movedX, this.size, "pad")) {
        pos = movedX;
    }

    let ySpeed = this.speed.y + time * gravity;
    let movedY = pos.plus(new Vec(0, ySpeed * time));
    if (!state.level.touches(movedY, this.size, "wall")&&!state.level.touches(movedY, this.size, "pad")) {
        pos = movedY;
    } else if ((keys.ArrowUp | keys.w) && ySpeed > 0) {
        sfx("#jump")
        ySpeed = -jumpSpeed;
    } else {
        ySpeed = 0;
    }
    return new Player(pos, new Vec(xSpeed, ySpeed));
};

function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
        if (keys.includes(event.key)) {
            down[event.key] = event.type == "keydown";
            event.preventDefault();
        }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    return down;
}

const arrowKeys =
    trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "a", "w", "d"]);

function runAnimation(frameFunc) {
    let lastTime = null;
    function frame(time) {
        if (lastTime != null) {
            let timeStep = Math.min(time - lastTime, 100) / 1000;
            if (frameFunc(timeStep) === false) return;
        }
        lastTime = time;
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

function runLevel(levels, level, Display) {
    let display = new Display(document.body, levels[level]);
    let state = State.start(levels[level]);
    let ending = 1;
    let backgroundAudio = [document.querySelector("#audio_one"), document.querySelector("#audio_two")][level%2];
    return new Promise(resolve => {
        runAnimation(time => {
            state = state.update(time, arrowKeys);
            display.syncState(state);

            //stop autoplayback error
            var playPromise = backgroundAudio.play()

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    console.debug("Started playing!")
                })
                .catch(error => {
                    console.debug("playback error {} Start playing!", error)
                });
            }
            if (state.status == "playing") {
                return true;

            } else if (ending > 0) {
                backgroundAudio.pause();
                backgroundAudio.currentTime = 0;
                ending -= time;
                return true;
            } else {
                return standardAnimation(display, backgroundAudio, state, resolve)
            }
        });
    });
}

function standardAnimation(display, backgroundAudio, state, resolve) {
    display.clear();
    backgroundAudio.pause();
    backgroundAudio.currentTime = 0;
    resolve(state);
    return false;
}

function initialLevelAndScoreSetup(plans) {
    let levels = [];
    let totalScore = 0;
    for (let level = 0; level < plans.length; level++) {
            levels.push(new Level(plans[level]));
           
            levelScore =(levels[level].plan.match(/(1|2|3|4|5|6|7|8|9)/g) || []).length;
            totalScore = totalScore + levelScore;
    }
    scorebox = document.getElementById("score")
    scorebox.innerHTML = "0 / " + totalScore;

    return levels
}

async function runGame(plans, Display) {
    let levels = initialLevelAndScoreSetup(plans);

    for (let currentLevel = 0; currentLevel < plans.length;) {
        let state = await runLevel(levels, currentLevel, Display);

        levels[currentLevel] = new Level(state.level.plan);

        if ((state.status == "teleport_forward" && currentLevel != plans.length - 1)) {
            //make sure player starts on left on new level
            let targetLevel = currentLevel + 1;
            // return Player to player_left or player_right
            levels = basicEntryPointChanges(levels, targetLevel);

            levels[targetLevel] = new Level(levels[targetLevel].plan.replace("$", "@"));
            currentLevel = targetLevel;
        } else if (state.status == "teleport_backward" && currentLevel != 0) {
            //make sure player starts on right on new level
            let targetLevel = currentLevel - 1;
            // return Player to player_left or player_right
            levels = basicEntryPointChanges(levels, targetLevel);

            levels[targetLevel] = new Level(levels[targetLevel].plan.replace("%", "@"));
            currentLevel = targetLevel;
        }
        
        if (state.glassesFound) {
            levels[currentLevel]  = new Level(levels[currentLevel].plan.replaceAll("x", "#"));
        }
    }
    console.log("You've won: Go to https://snip.bt.com/easywin");
}

function basicEntryPointChanges(levels, targetLevel) {
    if (levels[targetLevel].plan.includes("%")) {
        levels[targetLevel].plan = levels[targetLevel].plan.replace("@", "$");
    } else {
        levels[targetLevel].plan = levels[targetLevel].plan.replace("@", "%");
    }
    return levels
}