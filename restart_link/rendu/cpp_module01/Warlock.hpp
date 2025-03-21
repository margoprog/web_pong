#pragma once

#include <iostream>
 #include <map> 
 #include <vector> 

 #include "ASpell.hpp"
 #include "ATarget.hpp"

 #include "Dummy.hpp"

 #include "Fwoosh.hpp"



 class Warlock {


        private:
        std::string title; 
        std::string name; 

        std::vector<ASpell*> arr;

        Warlock();
        Warlock&operator=( const Warlock &other);
        Warlock(const Warlock &other);
       

        public:
        ~Warlock();
        Warlock(const std::string & name, const  std::string & title);
        void setTitle(const std::string & title);
        const std::string & getName() const;
        const std::string & getTitle() const;

        void introduce() const;


        void learnSpell( ASpell* ref);
        void forgetSpell(std::string spell);
        void launchSpell(std::string spell, const ATarget & ref);



 };
 
//  int main()
//  {
//    Warlock richard("Richard", "the Titled");
 
//    Dummy bob;
//    Fwoosh* fwoosh = new Fwoosh();
 
//    richard.learnSpell(fwoosh);
 
//    richard.introduce();
//    richard.launchSpell("Fwoosh", bob);
 
//     richard.forgetSpell("Fwoosh");
//    richard.launchSpell("Fwoosh", bob);
//  }
 