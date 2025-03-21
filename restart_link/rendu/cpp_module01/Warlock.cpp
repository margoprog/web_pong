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
    if(ref)
    {
        for( size_t i = 0; i != this->arr.size() ; i++)
        {
            if( this->arr[i]->getName()== ref->getName())
                return;
        }
        arr.push_back(ref->clone());
    }

}

void Warlock::forgetSpell(std::string spell)
{
    for(std::vector<ASpell*>::iterator it = this->arr.begin() ; it != this->arr.end(); it++) //++it??
    {
         

        if( (*it)->getName() == spell)  //parenthese fucking fuck
        {
            
            delete *it;
            arr.erase(it);
            return;
        }

    }
}

void Warlock::launchSpell(std::string spell, const ATarget & ref)
{
     for( size_t i = 0 ; i != this->arr.size() ; i++)
    {
        if( this->arr[i]->getName() == spell)
        {
            this->arr[i]->launch(ref);
        }  
    }

}

