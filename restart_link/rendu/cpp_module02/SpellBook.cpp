#include "SpellBook.hpp"


SpellBook::SpellBook()
{

}


SpellBook::~SpellBook()
{
}



void SpellBook::learnSpell(ASpell* ref)
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

void SpellBook::forgetSpell(const std::string & spell)
{
    for(std::vector<ASpell*>::iterator it = this->arr.begin() ; it != this->arr.end(); it++) //++it??
    {
        if( (*it)->getName() == spell)  //parenthese fucking fuck
        {
            delete *it;
            arr.erase(it);
           // return;
        }
    }
}

ASpell* SpellBook::createSpell(const std::string & spell)
{
     for( size_t i = 0 ; i != this->arr.size() ; i++)
    {
        if( this->arr[i]->getName() == spell)
        {
            return(arr[i]->clone());
        }  
    }
    return(NULL);
}

