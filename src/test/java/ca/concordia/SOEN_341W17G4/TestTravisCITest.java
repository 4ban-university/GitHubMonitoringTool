package ca.concordia.SOEN_341W17G4;

import junit.framework.TestCase;

public class TestTravisCITest extends TestCase {
    public void testSumStr() throws Exception {
        assertEquals("AB",TestTravisCI.sumStr("A","B"));
        assertEquals("BA",TestTravisCI.sumStr("B","A"));
    }

    public void testSumStrWithSpace() throws Exception {
        assertEquals("A B",TestTravisCI.sumStrWithSpace("A","B"));
        assertEquals("B A",TestTravisCI.sumStrWithSpace("B","A"));

    }

}