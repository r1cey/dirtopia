import Item	from "./Item.js"



export default( Base =Item )=>class Block	extends Base
{
	get isblock()	{return this }
}