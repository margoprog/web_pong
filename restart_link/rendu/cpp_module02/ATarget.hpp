#pragma once

#include <iostream>
 #include <map> 
 #include <vector> 
 #include "ASpell.hpp" 


 class ASpell ;

 class ATarget {


        private:
        std::string type; 
   

        

        public:
        virtual ~ATarget();
        ATarget(const std::string & name);
        ATarget();
        ATarget&operator=( const ATarget &other);
        ATarget(const ATarget &other);
       
        const std::string & getType() const;

        virtual ATarget* clone() const = 0;

        void getHitBySpell(const ASpell & ref) const;


 };

//  int main()
// {
//   ASpell const richard("Richard", "Mistress of Magma");
//   richard.introduce();
//   std::cout << richard.getName() << " - " << richard.gettype() << std::endl;

//   ASpell* jack = new ASpell("Jack", "the Long");
//   jack->introduce();
//   jack->setTitle("the Mighty");
//   jack->introduce();

//   delete jack;

//   return (0);
// }

