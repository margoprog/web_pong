#pragma once

#include <iostream>
 #include <map> 
 #include <vector> 

 #include "ASpell.hpp"




 class SpellBook {


        private:
        std::vector<ASpell*> arr;

        
        SpellBook&operator=( const SpellBook &other);
        SpellBook(const SpellBook &other);
       

        public:
        ~SpellBook();
        SpellBook();

        void learnSpell( ASpell* ref);
        void forgetSpell(const std::string & spell);
        ASpell* createSpell(const std::string & spell);

 };
 
//  int main()
//  {
//    SpellBook richard("Richard", "the Titled");
 
//    Dummy bob;
//    Fwoosh* fwoosh = new Fwoosh();
 
//    richard.learnSpell(fwoosh);
 
//    richard.introduce();
//    richard.launchSpell("Fwoosh", bob);
 
//     richard.forgetSpell("Fwoosh");
//    richard.launchSpell("Fwoosh", bob);
//  }
 