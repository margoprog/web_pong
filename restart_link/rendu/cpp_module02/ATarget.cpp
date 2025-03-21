#include "ATarget.hpp"


ATarget::ATarget()
{

}
ATarget&ATarget::operator=( const ATarget &other)
{
    this->type= other.getType();


    return(*this);
}

ATarget::ATarget(const ATarget & other)
{
    *this = other;
}

ATarget::~ATarget()
{

}

void ATarget::getHitBySpell(const ASpell & ref) const
{
    std::cout << this->type  << " has been " << ref.getEffects() << "!" << std::endl;
}

ATarget::ATarget(const std::string & type)
{
    this->type = type;

}

const std::string & ATarget::getType() const
{
   return this->type;
}



