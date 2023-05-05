#include <iostream>
#include <string>
#include <cstring>
using namespace std;
#define SIZE 256

void test(string s) {
    string result = "";
    char *temp = new char[s.length() + 1];
    strcpy(temp, s.c_str());
    char *ptok = strtok(temp, " ");
    
    while (ptok != NULL) {
        result += ptok;
        result += " ";
        cout << result << endl;
        ptok = strtok(NULL, " ");
    }
    delete[] temp;
}

int main() {
    string s;
    cout << "Nhap chuoi: ";
    getline(cin, s);
    test(s);
    return 0;
}
