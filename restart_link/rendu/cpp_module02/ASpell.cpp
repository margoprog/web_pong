#include "ASpell.hpp"


ASpell::ASpell()
{

}
ASpell&ASpell::operator=( const ASpell &other)
{
    this->name= other.getName();
    this->effects= other.getEffects();

    return(*this);
}

ASpell::ASpell(const ASpell & other)
{
    *this = other;
}

ASpell::~ASpell()
{

}

ASpell::ASpell(const std::string & name, const  std::string & effects)
{
    this->name = name;
    this->effects = effects;
}

const std::string & ASpell::getName() const
{
   return this->name;
}

const std::string & ASpell::getEffects() const
{
    return this->effects;
}



void ASpell::launch(const ATarget & ref) const
{
    ref.getHitBySpell(*this);
}


