import JRev	from "../www/shared/JsonRevivr.js"

// import Pl from "./player/Player.js"
// import Item from "../www/shared/items/Item.js"
// import Hands from "../www/shared/player/Hands.js"
import itemTps from "./items/itemTypes.js"




export default class extends JRev
{
	constructor()
	{
		super()

		this.addo( itemTps )
	}
}