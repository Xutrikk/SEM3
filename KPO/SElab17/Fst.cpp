#include "stdafx.h" 

namespace FST
{
    RELATION::RELATION(unsigned char c, short nn)
    {
        symbol = c; 
        nnode = nn; //����� ���������� ����
    }

    NODE::NODE()
    {
        n_relation = 0; 
        relations = nullptr; 
    }

    NODE::NODE(short n, RELATION rel, ...)
    {
        n_relation = n; 
        RELATION* p = &rel; // �������� ��������� �� ������ ������� 
        relations = new RELATION[n]; 
        for (short i = 0; i < n; i++) 
        {
            relations[i] = p[i];
        }
    }

    FST::FST(std::string s, short ns, NODE n, ...)
    {
        string = s; 
        nstates = ns; 
        nodes = new NODE[ns]; 
        NODE* p = &n; 
        for (int k = 0; k < ns; k++)
        {
            nodes[k] = p[k]; 
        }
        rstates = new short[nstates]; 
        memset(rstates, 0xff, sizeof(short) * nstates); // ��������� ������ ��������� ���������� 0xff
        rstates[0] = 0; 
        position = -1; 
    }

    // ������� ��� ���������� ������ ���� ��������
    bool step(FST& fst, short*& rstates)
    {
        bool rc = false;
        std::swap(rstates, fst.rstates); // ������ ������� ��������� ��������� � ��������� ��������
        for (short i = 0; i < fst.nstates; i++) 
        {
            if (rstates[i] == fst.position) 
                for (short j = 0; j < fst.nodes[i].n_relation; j++) // ���� �� ���� ���������� ����
                {
                    if (fst.nodes[i].relations[j].symbol == fst.string[fst.position]) // ���� ������ ��������� � �������� �� ������� ������
                    {
                        fst.rstates[fst.nodes[i].relations[j].nnode] = fst.position + 1; // ��������� � ���������� ���������
                        rc = true; 
                    }
                }
        }
        return rc; 
    }

    // ������� ��� ���������� ��������
    bool execute(FST& fst)
    {
        short* rstates = new short[fst.nstates]; 
        memset(rstates, 0xff, sizeof(short) * fst.nstates); 
        short lstring = fst.string.length(); // �������� ����� ������� ������
        bool rc = true; 
        for (short i = 0; i < lstring && rc; i++) 
        {
            fst.position++; 
            rc = step(fst, rstates); 
        }
        fst.rstates[0] = 0; 
        return (rc ? (fst.rstates[fst.nstates - 1] == lstring) : rc); 
    }

    void WriteError(Error::ERROR e)
    {
        std::cout << "������ ������� ������" << std::endl; 
        std::cout << "������ ������� � ������: " << e.inext.buff << std::endl; 
        std::cout << "�������: " << e.inext.fstline + 1; 
    }
}