#pragma once

#include <iostream>
 #include <map> 
 #include <vector> 

 #include "ASpell.hpp"
 #include "ATarget.hpp"

 #include "Dummy.hpp"

 #include "Fwoosh.hpp"
 #include "SpellBook.hpp"
  #include "TargetGenerator.hpp"
   #include "Fireball.hpp"
   #include "Polymorph.hpp"
   #include "BrickWall.hpp"

   




 class Warlock {


        private:
        std::string title; 
        std::string name; 

       // std::vector<ASpell*> arr;

        Warlock();
        Warlock&operator=( const Warlock &other);
        Warlock(const Warlock &other);

        SpellBook book;

       

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
 \


 int main()
{
  Warlock richard("Richard", "foo");
  richard.setTitle("Hello, I'm Richard the Warlock!");
  BrickWall model1;

  Polymorph* polymorph = new Polymorph();
  TargetGenerator tarGen;

  tarGen.learnTargetType(&model1);
  richard.learnSpell(polymorph);

  Fireball* fireball = new Fireball();

  richard.learnSpell(fireball);

  ATarget* wall = tarGen.createTarget("Inconspicuous Red-brick Wall");

  richard.introduce();
  richard.launchSpell("Polymorph", *wall);
  richard.launchSpell("Fireball", *wall);
}

