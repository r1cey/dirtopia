import JRev	from "../www/shared/JsonRevivr.js"

// import Pl from "./player/Player.js"
// import Item from "../www/shared/itemTps/Item.js"
// import Hands from "../www/shared/player/Hands.js"
import items from "../www/shared/items/items.js"




export default class extends JRev
{
	constructor()
	{
		super()

		this.addo( items )
	}
}