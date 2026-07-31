import newBlock from "../../www/shared/items/newBlock.js"


export default class Block	extends newBlock()
{
	static
	{
		for(let dir =0 ;dir< 6 ;dir++)
		{
			this.acts["mov"+dir][1]	=function( nav ,pl )
			{

			}
		}
	}
}
