import newStackCnt from "../../www/game/shared/items/newStackCnt.js"

export default class SCnt extends newStackCnt()
{


	spawncnt()
	{
		this.del( 1 )

		return this.gCnt().setuniq()
	}


	/*newcnt()
	{
		return new this.gCnt().setuniq()
	}*/
}