#pragma once

#include <iostream>
 #include <map> 
 #include <vector> 
 #include "ATarget.hpp"

 class ATarget;

 class ASpell {


        private:
        std::string effects; 
        std::string name; 

        

        public:
        virtual ~ASpell();
        ASpell(const std::string & name, const  std::string & effects);
        ASpell();
        ASpell&operator=( const ASpell &other);
        ASpell(const ASpell &other);
       
        const std::string & getName() const;
        const std::string & getEffects() const;

        virtual ASpell* clone() const = 0;

        void launch(const ATarget & ref) const;


 };

//  int main()
// {
//   ASpell const richard("Richard", "Mistress of Magma");
//   richard.introduce();
//   std::cout << richard.getName() << " - " << richard.geteffects() << std::endl;

//   ASpell* jack = new ASpell("Jack", "the Long");
//   jack->introduce();
//   jack->setTitle("the Mighty");
//   jack->introduce();

//   delete jack;

//   return (0);
// }

