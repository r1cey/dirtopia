import JRev	from "./shared/JsonRevivr.js"

import Pl from "./player/Player.js"
import Item from "./items/Item.js"
import Hands from "./player/Hands.js"
import its from "./items/items.js"

export default class extends JRev
{
	constructor()
	{
		super()

		this.addo( its )

		// this.adda([ Hands, Item.newRevObj(this) ])
	}
}