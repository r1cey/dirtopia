import JRev	from "../www/game/shared/JsonRevivr.js"

import Pl from "./player/Player.js"
// import Item from "../www/game/shared/items/Item.js"
import Hands from "../www/game/shared/player/Hands.js"
// import its from "../www/game/shared/items/items.js"
import items	from "./items/items.js"




export default class extends JRev
{
	constructor()
	{
		super()

		this.addo( items ).adda([ Pl, Hands ])
	}
}