#pragma once

#include <iostream>
 #include <map> 
 #include <vector> 


 class Warlock {


        private:
        std::string title; 
        std::string name; 

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

 };

//  int main()
// {
//   Warlock const richard("Richard", "Mistress of Magma");
//   richard.introduce();
//   std::cout << richard.getName() << " - " << richard.getTitle() << std::endl;

//   Warlock* jack = new Warlock("Jack", "the Long");
//   jack->introduce();
//   jack->setTitle("the Mighty");
//   jack->introduce();

//   delete jack;

//   return (0);
// }

