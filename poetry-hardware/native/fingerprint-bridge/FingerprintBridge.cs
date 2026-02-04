// File: Diagnostic.cs
// Purpose: Low-level diagnostic tool for DigitalPersona fingerprint reader.
// Tests each SDK component independently to identify where the failure occurs.
// All Rights Reserved. Arodi Emmanuel

using System;
using DPUruNet;

class Diagnostic
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== DigitalPersona Reader Diagnostic ===\n");

        // 1. Test ReaderCollection
        Console.WriteLine("[1] Testing ReaderCollection.GetReaders()...");
        ReaderCollection readers;
        try
        {
            readers = ReaderCollection.GetReaders();
            Console.WriteLine("    OK - Found " + readers.Count + " reader(s)");
        }
        catch (Exception ex)
        {
            Console.WriteLine("    FAIL - " + ex.Message);
            return;
        }

        if (readers.Count == 0)
        {
            Console.WriteLine("\nNo readers found. Check USB connection and drivers.");
            return;
        }

        // 2. Test Reader details
        Reader reader = readers[0];
        Console.WriteLine("\n[2] Reader Details:");
        Console.WriteLine("    Name: " + reader.Description.Name);
        Console.WriteLine("    Serial: " + reader.Description.SerialNumber);

        // 3. Test Reader.Open
        Console.WriteLine("\n[3] Testing Reader.Open(EXCLUSIVE)...");
        var openRc = reader.Open(Constants.CapturePriority.DP_PRIORITY_EXCLUSIVE);
        Console.WriteLine("    Result: " + openRc);

        if (openRc != Constants.ResultCode.DP_SUCCESS)
        {
            Console.WriteLine("    Trying COOPERATIVE...");
            openRc = reader.Open(Constants.CapturePriority.DP_PRIORITY_COOPERATIVE);
            Console.WriteLine("    Result: " + openRc);
        }

        if (openRc != Constants.ResultCode.DP_SUCCESS)
        {
            Console.WriteLine("\nFAIL: Cannot open reader.");
            return;
        }

        // 4. Test Capabilities
        Console.WriteLine("\n[4] Reader Capabilities:");
        Console.WriteLine("    CanCapture: " + reader.Capabilities.CanCapture);
        Console.WriteLine("    Resolutions: " + string.Join(", ", reader.Capabilities.Resolutions));

        // 5. Quick capture test
        Console.WriteLine("\n[5] Capture test (5s timeout) - PUT FINGER ON READER NOW!");
        
        int resolution = reader.Capabilities.Resolutions[0];
        var result = reader.Capture(
            Constants.Formats.Fid.ANSI,
            Constants.CaptureProcessing.DP_IMG_PROC_DEFAULT,
            5000,
            resolution
        );

        Console.WriteLine("    ResultCode: " + result.ResultCode);
        Console.WriteLine("    Quality: " + result.Quality);
        Console.WriteLine("    HasData: " + (result.Data != null));
        
        if (result.Data != null && result.Data.Views != null)
            Console.WriteLine("    ViewCount: " + result.Data.Views.Count);

        reader.Dispose();
        Console.WriteLine("\n=== Done ===");
    }
}
