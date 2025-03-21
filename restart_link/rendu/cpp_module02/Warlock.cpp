#include "Warlock.hpp"


Warlock::Warlock()
{

}
Warlock&Warlock::operator=( const Warlock &other)
{
    this->name= other.getName();
    this->title= other.getTitle();

    return(*this);
}

Warlock::Warlock(const Warlock & other)
{
    *this = other;
}

Warlock::~Warlock()
{
    std::cout << this->name  << ": My job here is done!" << std::endl;
}

Warlock::Warlock(const std::string & name, const  std::string & title)
{
    this->name = name;
    this->title = title;
    std::cout << this->name  << ": This looks like another boring day." << std::endl;

}

void Warlock::setTitle(const std::string & title)
{
    this->title= title;
}

const std::string & Warlock::getName() const
{
   return this->name;
}

const std::string & Warlock::getTitle() const
{
    return this->title;
}


void Warlock::introduce() const
{
    std::cout << this->name << ": I am " << this->name << ", "<< this->title << "!"<<std::endl;
}


void Warlock::learnSpell(ASpell* ref)
{
   book.learnSpell(ref);
}

void Warlock::forgetSpell(std::string spell)
{
   book.forgetSpell(spell);
}

void Warlock::launchSpell(std::string spell, const ATarget & ref)
{
    ASpell * temp = book.createSpell(spell);
    if(temp)
         temp->launch(ref);
   
}

