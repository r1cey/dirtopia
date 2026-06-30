import ShPls    from "../../shared/player/Players.js"
import Pl from "./Player.js"


export default class Players  extends ShPls
{
    static Player   =Pl


    get srv()   {return this.game.srv }
}