export default( Base )=>class Soft	extends Base
{
	calcvol()	{return this.vol() + this.itemvol() }
}