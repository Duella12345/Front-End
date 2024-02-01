var GAME_LEVELS = [`
........................................................#
........................................................#
........................................................#
........................................................#
........................................................#
........................................................#
........................................................#
.....6..................................................#
........................................................#
....xxx.................................................#
........................................................#
........................................................#
........................................................#
.........xxx............................................#
........................................................#
........................................................#
........................................................#
....xxx.................................................#
........................................................#
.....................###......###.......................#
....................##+##....##+##......................#
.........xxx........#+++#....#+++#......................#
....................##+##....##+##......................#
.....................#v#......#v#.......................#
....xxx..............#.#......#v#.......................#
........................................................#
..........5..............######.........................#
........................#...............................#
.........###...........#................................#
.................###...#..2.............................#
####....................#...............................#
.........4...............#####..........................#
..............................#.....###.................#
........###....................#........................#
...........................1...#.........8..............#
#####.........................#.........................#
#.......3...............######..........###.............#
#.......................................................#
#......###....................................###......##
#.........................7............................>#
#@........................=...........................%>#
#########################################################
.........................................................
`,`
..............................###....................................#
..............................#v#....................................#
..............................#v#....................................#
..............................#v#....................................#
..............................#v#....................................#
..............................#v#....................................#
..............................#v#....................................#
..............................#v#....................................#
..............................#v#....................................#
..............................#v#....................................#
..............................#v#....................................#
..............................#v#....................................#
..............................#v#....................................#
..............................#v#....................................#
..............................#v#....................................#
..............................#v#....................................#
..............................#v#....................................#
.....................................................................#
.....................................................................#
.....................................................................#
.....................................................................#
.....................................................................#
.....................................................................#
.....................................................................#
.....................................................................#
.....................................................................#
.....................................................................#
.....................................................................#
............................................###......................#
.................................#.......#...........................#
.................................##......#.....=##...................#
.................................#.#.....#...........................#
..............6..................#.#..1..#.=....=..##................#
.................................#..#....#...........................#
.................................#...#...#.=..=..=..=.##.............#
.................................#...#...#...........................#
............#....................#....#..#=.=.=.=.=.=.=.=##...7......#
...........#.....................#.....#.#...........................#
..........#......................#.....#.#...................###.....#
.........#.......................#......##...........................#
........#........................#.......#.=x............###.........#
.............................####....................................#
......................................5..............................#
##......2.....3.....4................................###............##
#<..................................................................>#
#<$.....................#..........=.xxx.......=..#................%>#
######################################+###############################
.....................................###..............................
`,`
.......................#<.>#........................................#
........................#%#.........................................#
........................#$#.........................................#
....................................................................#
.........................1..........................................#
....................................................................#
.........................2..........................................#
....................................................................#
....................................................................#
....................................................................#
....................................................................#
....................................................................#
....................................................................#
....................................................................#
....................................................................#
....................................................................#
....................................3.................##............#
.............................###############........................#
....................................#......................##.......#
....................................#...............................#
.........................4..........#...............................#
....................................#.................##............#
....................................#...............................#
....................................#...............................#
#...................................#......................##.......#
#...................................#...............................#
#........................5..........#...............................#
#...................................#.................##............#
#........................6..........#..7............................#
#............................###############........................#
#..........................................................##.......#
#.##...............................................................##
#.#<...............................................................>#
#.#<...............................................................>#
#+###################################################################
###..................................................................
.....................................................................
`,`
................................................................#
................................................................#
................................................................#
................................................................#
................................................................#
................................................................#
................................................................#
.........4......................................................#
........###...###...###.....###.................................#
..........#+++#.................................................#
..........#####...................####.....6....................#
................................................................#
..........................................###...................#
................................................................#
.................................................###............#
..............................######............................#
.............................#......#...........................#
.............................#.......#..........................#
.............................#.......>#.................###.....#
.............................##......>#...........2.............#
.............................#<..5..%#..........................#
.............................#<....##...........................#
.............................######.............###.............#
.............................#..................................#
.#...........................#..................................#
.#....................###....#.........................###......#
.#...........................#..................................#
.#...........................#................................3.#
.#...............###.........#................................###
.#...........................#..................................#
.#..............................................................#
.##.........###.......................................###......##
.#<.........................###................................>#
.#<$.1.........................................................>#
.#######+++++++++++++++++++++++++++##############################
+#.....#############################.............................
##...............................................................
`,`
....................................................#
..................................###...............#
............#....................##+##..............#
...........#.....................#+++#..............#
...........#.....................##+##..............#
...........#......................#v#...............#
...........#.............######.................1...#
...........#............#...........................#
............#..........#............................#
...............###.....#..2.......6.........##......#
..............##+##.....#...........................#
..............#+++#......#####......................#
..............##+##...........#......###............#
.##............#v#.............#..........3.........#
.#.............xxx...........7.#....................#
.#..................5.........#....8................#
.#......................######...........###.....9..#
.##................###.............................##
.#<.........####...........4.......................>#
.#<$........#..#xx................................%>#
+############..#++################...################
##.............####..............#...#...............
.................................#+++#...............
.................................#+++#...............
.................................#####...............
.....................................................
.....................................................
`,`
..........................#+v+#...................................#
..........................#+.+#...................................#
..........................#+.+#...................................#
..........................#+v+#...................................#
..........................#+.+#...................................#
..........................#+.+#...................................#
..........................#+v+#...................................#
..........................#+.+#...................................#
..........................#+.+#...................................#
..........................#+v+#...................................#
..........................#+.+#...................................#
..........................#+.+#...................................#
..........................#+v+#...................................#
..........................#+.+#...................................#
..........................#+.+#...................................#
..........................#+v+#...................................#
..........................#+.+#...................................#
..........................#+.+#...................................#
..........................#+v+#...................................#
..........................#+.+#...................................#
..........................#+.+#...................................#
..........................#+v+#...................................#
...........................#v#....................................#
..................................................................#
..................................................................#
..................................................................#
..................................................................#
..................................................................#
..................................................................#
..................................................................#
..................................................................#
..................................................................#
..................................................................#
.....................#.............#.....xx............5..........#
.....................#.............#............xx................#
.....................#.............#..................##..........#
.....................#x...........x#..............................#
.....................#x.....1.....x#..............................#
.....................#x...........x#..............................#
.....................###############.......................##.....#
.....................#x...........x#..............................#
.....................#x...........x#..................6...........#
.....................#x...........x#..............................#
.....................#.............#..................##..........#
.....................#.............#..............................#
.....................#.............#..............................#
..................2..#......3......#..4...........................#
...........................................................##.....#
##...............................................................##
#<...............................................................>#
#<$.............................................................%>#
################..##+#+####+++####+#+##..##########################
...............#...#+++#..#+++#..#+++#...#.........................
...............#...#####..#####..#####...#.........................
................#.......................#..........................
................#.......................#..........................
................#########################..........................
...................................................................
...................................................................
`,`
........................................................#
........................................................#
........................................................#
........................................................#
........................................................#
........................................................#
.......xxx.....xxx.....########.........................#
3......................#................................#
.......................#.2..............................#
#+#....................#................................#
###....................#................................#
.......................########.........................#
.......#+#.............#................................#
.......###.............#.1..............................#
.......................#..........................4.....#
#+#....................#................................#
###....................########...................##....#
........................................................#
.......#+#..............................................#
##.....###.............................................##
#<.....................................................>#
#<$.x=x............x=x...........x............=.......%>#
#########################################################
.........................................................
`,`
..............................#vvv#.......................#
..............................#vvv#.......................#
..............................#vvv#.......................#
..............................#vvv#.......................#
..............................#vv.#.......................#
..............................#vvv#.......................#
..............................#vvv#.......................#
..............................#vvv#.......................#
..............................#v.v#.......................#
..............................#vvv#.......................#
..............................#vvv#.......................#
..............................#.vv#.......................#
..............................#vvv#.......................#
..............................#vvv#.......................#
..............................#v.v#.......................#
..............................#vvv#.......................#
..............................#vvv#.......................#
..............................#vv.#.......................#
..............................#vvv#.......................#
..............................#vvv#.......................#
..............................#vvv#.......................#
..............................#v.v#.......................#
..............................#vvv#.......................#
..............................#vvv#.......................#
..............................#.vv#.......................#
..............................#vvv#.......................#
..............................#vvv#.......................#
..............................#vvv#.......................#
..............................#vvv#.......................#
..............................#vvv#.......................#
..........................................................#
..........................................................#
..........................................................#
..........................................................#
.......................#..................................#
.......................#..................................#
.......................#..................................#
.......................#..................................#
.......................#......x...x.......................#
.......................#......xxxxx.......................#
.......................#..................................#
.......................#.1................................#
.......................#..................................#
.......................#..................................#
.......................########...........................#
..........................................................#
##................................###.........2..........##
#<.......................................................>#
#<$.....................................................%>#
##############################.###.########################
.............................#.....#.......................
.............................#.....#.......................
.............................#######.......................
...........................................................
...........................................................
`,`
...........................................................#
...........................................................#
...........................................................#
...........................................................#
...........................................................#
...........................................................#
...........###.........................###.................#
..................###...........###........................#
...........................................................#
.........................###...............###.............#
.....###......+++++++++++++++++++++++++++..................#
..............###########################..................#
...............................................###.........#
...........................................................#
........##.............########........x.....x.............#
.......................#..........................###......#
.......................#.1................x................#
.......................#...................................#
.......................#.o..............x...x..........###.#
............##.........########..........xxx...............#
.......................#...........##......................#
.......................#..........................###......#
.......................#...................................#
...............##......#.......##..........................#
.......................#...................................#
.............................................###...........#
..................##.......##..............................#
...........................................................#
.......................................###.................#
......................###..................................#
...........................................................#
..................................###......................#
...........................................................#
...........................................................#
##...........................###...........................#
#<.........................................................#
#<$%.......................................................#
############################################################
`];

if (typeof module != "undefined" && module.exports && (typeof window == "undefined" || window.exports != exports))
  module.exports = GAME_LEVELS;
if (typeof global != "undefined" && !global.GAME_LEVELS)
  global.GAME_LEVELS = GAME_LEVELS;
