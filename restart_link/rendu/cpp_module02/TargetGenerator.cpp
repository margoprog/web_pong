#include "TargetGenerator.hpp"


TargetGenerator::TargetGenerator()
{

}


TargetGenerator::~TargetGenerator()
{
}



void TargetGenerator::learnTargetType(ATarget* ref)
{
    if(ref)
    {
        for( size_t i = 0; i != this->arr.size() ; i++)
        {
            if( this->arr[i]->getType()== ref->getType())
                return;
        }
        arr.push_back(ref->clone());
    }

}

void TargetGenerator::forgetTargetType(const std::string & target)
{
    for(std::vector<ATarget*>::iterator it = this->arr.begin() ; it != this->arr.end(); it++) //++it??
    {
        if( (*it)->getType() == target)  //parenthese fucking fuck
        {
            delete *it;
            arr.erase(it);
            return;
        }
    }
}

ATarget* TargetGenerator::createTarget(const std::string & target)
{
     for( size_t i = 0 ; i != this->arr.size() ; i++)
    {
        if( this->arr[i]->getType() == target)
        {
            return(arr[i]->clone());
        }  
    }
    return(NULL);
}

